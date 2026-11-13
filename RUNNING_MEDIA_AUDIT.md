# TRAIN LOG 新计划与素材核对

## 计划与数据

- 原有四练保持独立，原有计划库 10 套按 ID 保留一次。
- 新增健身房计划 14 套，跑步专项力量 RS01–RS09 共 9 套；计划库合计 33 套。
- 新增动作 38 个；与前一批 63 个动作合计 101 个扩展动作，动作总数 174 个。
- 训练记录、身体数据和用户计划继续存放在现有 IndexedDB 数据库与对象仓库；数据库版本不变。
- 更新前代码标记：`backup-before-running-strength-20261113`。

## 素材来源与对应

- 原有循环 GIF 来自固定版本 [`hasaneyldrm/exercises-dataset@7455efae`](https://github.com/hasaneyldrm/exercises-dataset/tree/7455efae41b330c265e7cd4b78dfa848e7ce5ebd)；本轮又从公开的 Gym Visual 风格动画视频生成 11 张匹配 GIF。本地文件均在 `assets/gym-visual/advanced/`，动作到文件的对应在 `advanced-content.js`。
- 38 个动作的视频 BV 号、UP 主、时长和封面通过 B 站 `x/web-interface/view` 接口逐条核实，对应表在 `advanced-videos.js`。嵌入地址形式为 `https://player.bilibili.com/player.html?bvid=<BV号>&page=1`。
- 视频优先核对 ALEX；完全对应的采用 ALEX，其余依次核对大志、凯圣王、谭成义及其他 UP 主。
- 动作要点、常见错误、目标肌群与辅助肌群在 `advanced-content.js`；人体 SVG 母版未修改。

## 18 个近似动作的第二轮核对

Gym Visual 官方 GIF 目录现有约 6558 个条目，明显多于固定的 1324 条数据集。本轮逐项查找官方目录与 Lyfta 公开的 Gym Visual 动画视频，对 12 个动作制作了 180×180、10 fps、白底无字的本地循环 GIF；同一动作映射用于动作库、计划和训练界面。动作 ID、计划数据和人体 SVG 均未改变。

### 已改为匹配的动作（7）

| 动作 ID | 核对结果 | 动画来源 |
| --- | --- | --- |
| `step_up` | 徒手登阶，未持哑铃 | [Bodyweight Step-up on Stepbox](https://apilyfta.com/static/GymvisualMP4/45791201-Bodyweight-Step-up-on-Stepbox_Thighs_.mp4) |
| `low_box_jump` | 双脚跳上低箱并站稳 | [Jump Box](https://apilyfta.com/static/GymvisualMP4/49651201-Jump-Box-(male)_Plyometrics_.mp4) |
| `band_hip_abduction` | 站姿弹力带髋外展 | [Band Hip Abduction](https://apilyfta.com/static/GymvisualMP4/40311201-Band-hip-abduction-(male)_Hips.mp4) |
| `single_leg_balance` | 地面单腿站立，无平衡板 | [Single Leg Stand](https://apilyfta.com/static/GymvisualMP4/37141201-Single-Leg-Stand_Plyometrics_.mp4) |
| `lateral_lunge` | 徒手侧向弓步蹲 | [Side Lunge](https://apilyfta.com/static/GymvisualMP4/29721201-Side-Lunge_Thighs.mp4) |
| `band_lateral_walk` | 弹力带侧向行走 | [Resistance Band Lateral Walk](https://apilyfta.com/static/GymvisualMP4/66071201-Resistance-Band-Lateral-Walk-(male)_Hips_.mp4) |
| `nordic_hamstring_eccentric` | 固定脚踝、缓慢前降的北欧腘绳肌动作 | [Nordic Hamstring Curl](https://apilyfta.com/static/GymvisualMP4/77461201-Nordic-Hamstring-Curl-(male)_Thighs_.mp4) |

### 画面明显改善，但仍保留“示意”提示（5）

| 动作 ID | 新 GIF | 剩余差异 |
| --- | --- | --- |
| `single_arm_overhead_triceps` | [单臂过顶弹力带臂屈伸](https://apilyfta.com/static/GymvisualMP4/41401201-Band-Overhead-Single-Arm-Triceps-Extension_Upper-A.mp4) | 单臂动作准确，阻力是弹力带而非绳索；原教学视频仍为双臂版本 |
| `lateral_step_down` | [侧向上下台阶](https://apilyfta.com/static/GymvisualMP4/51541201-Lateral-Step-Up_Thighs_.mp4) | 包含下阶阶段，但重点还包括上阶 |
| `band_ankle_eversion` | [坐姿抗阻踝外翻](https://apilyfta.com/static/GymvisualMP4/67451201-Cable-Seated-Foot-Eversion-(female)_Calves_.mp4) | 踝外翻轨迹准确，阻力是绳索而非弹力带 |
| `fast_step_up` | [徒手登阶动画加速 1.6 倍](https://apilyfta.com/static/GymvisualMP4/45791201-Bodyweight-Step-up-on-Stepbox_Thighs_.mp4) | 上、下台阶均加速，实际训练仍须稳定下阶 |
| `isometric_calf_raise` | [徒手提踵动画加入踮起位置停留](https://apilyfta.com/static/GymvisualMP4/13731201-Bodyweight-Standing-Calf-Raise_Calves.mp4) | 画面未扶墙，实际训练需静止保持目标秒数 |

### 仍未取得匹配且无字的动画（6）

| 动作 ID | 现状 | 找到的官方候选 |
| --- | --- | --- |
| `tibialis_raise` | 现用史密斯机示意 | [靠墙徒手胫骨前肌训练 GIF](https://gymvisual.com/animated-gifs/23661-standing-tibialis-raise-wall-supported-male.html) |
| `band_dorsiflexion` | 抗阻勾脚背动作接近，固定方式不同 | 未核实到更准确的官方 GIF |
| `towel_toe_curl` | 现用踝环绕示意 | [站姿毛巾抓地 GIF](https://gymvisual.com/animated-gifs/25080-standing-towel-foot-crunch-male.html)，与计划的坐姿不同 |
| `short_foot` | 现用踝环绕示意 | 未核实到短足训练官方 GIF |
| `low_pogo_hops` | 现用半蹲跳示意 | [双脚 Pogo 弹跳 GIF](https://gymvisual.com/animated-gifs/24144-pogo-jump-2-foot-male.html) |
| `swimming` | 现用陆上打腿示意 | 官方目录的 Swimming Crawl Style 仍是陆上动作，未见水中游泳版本 |

官方候选页可以确认动作存在，但并不提供可直接接入的无字原始 GIF 文件；公开转存的版本有覆盖人物的水印。上述 7 个动作保留明确提示，避免把不匹配的画面当作准确教学。取得原始素材后只需替换对应 GIF 文件和映射，不会改变用户训练记录。
