"""Convert reviewed 180 px Gym Visual motion clips to compact, looping GIFs.

Usage: python tools/build-gymvisual-gifs.py PATH_TO_OPENGYM_CHECKOUT
The checkout revision is recorded in assets/gym-visual/manifest.json.
"""

import json
import pathlib
import subprocess
import sys

import cv2
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
TARGET = ROOT / "assets" / "gym-visual"
MANIFEST = json.loads((TARGET / "manifest.json").read_text(encoding="utf-8"))


def clip_bytes(repo: pathlib.Path, catalog_id: int) -> bytes:
    result = subprocess.run(
        ["git", "show", f"HEAD:catalogue/media/clip/{catalog_id}.mp4"],
        cwd=repo,
        capture_output=True,
        check=True,
    )
    if not result.stdout:
        raise ValueError(f"Empty source clip: {catalog_id}")
    return result.stdout


def convert(source: pathlib.Path, target: pathlib.Path) -> None:
    cap = cv2.VideoCapture(str(source))
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        raise ValueError(f"Invalid frame rate: {source}")
    frames = []
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frames.append(Image.fromarray(rgb).convert("P", palette=Image.Palette.ADAPTIVE))
    cap.release()
    if len(frames) < 2:
        raise ValueError(f"Not an animation: {source}")
    if any(frame.size != (180, 180) for frame in frames):
        raise ValueError(f"Unexpected clip dimensions: {source}")
    duration = round(1000 / fps)
    frames[0].save(
        target,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        optimize=True,
        disposal=2,
    )
    with Image.open(target) as check:
        if check.n_frames < 2 or check.info.get("loop") != 0:
            raise ValueError(f"GIF verification failed: {target}")
    print(f"{target.name}: {len(frames)} frames, {target.stat().st_size} bytes")


def main() -> None:
    repo = pathlib.Path(sys.argv[1]).resolve()
    revision = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=repo, text=True).strip()
    if revision not in MANIFEST["source"]:
        raise ValueError(f"Unexpected source revision: {revision}")
    for action_id, catalog_id in MANIFEST["clips"].items():
        source = TARGET / f".{action_id}.mp4"
        try:
            source.write_bytes(clip_bytes(repo, catalog_id))
            convert(source, TARGET / f"{action_id}.gif")
        finally:
            source.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
