# TRAIN LOG 新计划与素材核对

## 计划与数据

- 原有四练保持独立，原有计划库 10 套按 ID 保留一次。
- 新增健身房计划 14 套，跑步专项力量 RS01–RS09 共 9 套；计划库合计 33 套。
- 新增动作 38 个；与前一批 63 个动作合计 101 个扩展动作，动作总数 174 个。
- 训练记录、身体数据和用户计划继续存放在现有 IndexedDB 数据库与对象仓库；数据库版本不变。
- 更新前代码标记：`backup-before-running-strength-20261113`。

## 素材来源与对应

- 循环 GIF 来自固定版本 [`hasaneyldrm/exercises-dataset@7455efae`](https://github.com/hasaneyldrm/exercises-dataset/tree/7455efae41b330c265e7cd4b78dfa848e7ce5ebd)，本地文件在 `assets/gym-visual/advanced/`；动作到素材 ID 的对应在 `advanced-content.js`。
- 38 个动作的视频 BV 号、UP 主、时长和封面通过 B 站 `x/web-interface/view` 接口逐条核实，对应表在 `advanced-videos.js`。嵌入地址形式为 `https://player.bilibili.com/player.html?bvid=<BV号>&page=1`。
- 视频优先核对 ALEX；完全对应的采用 ALEX，其余依次核对大志、凯圣王、谭成义及其他 UP 主。
- 动作要点、常见错误、目标肌群与辅助肌群在 `advanced-content.js`；人体 SVG 母版未修改。

## 近似 GIF 示意

固定 1324 条数据中没有以下动作的完全对应 GIF。应用内已显示“示意”并在详情写明差异，教学视频与动作文字按实际动作匹配。它们不应被当作准确动作示范。

| 动作 ID | 差异 |
| --- | --- |
| `single_arm_overhead_triceps` | GIF 与视频为双臂过顶，计划动作是单臂 |
| `step_up` | GIF 持哑铃，计划动作可徒手 |
| `tibialis_raise` | GIF 用史密斯机，计划动作可靠墙徒手 |
| `low_box_jump` | GIF 为下箱稳定，计划动作是跳上箱 |
| `lateral_step_down` | GIF 为登阶平衡，计划动作是侧向下阶 |
| `band_hip_abduction` | GIF 为坐姿版本，视频为站姿版本 |
| `single_leg_balance` | GIF 用平衡板，计划动作为地面站立 |
| `lateral_lunge` | GIF 持杠铃，计划动作可徒手 |
| `band_lateral_walk` | GIF 为坐姿髋外展，计划动作是侧向行走 |
| `isometric_calf_raise` | GIF 为动态提踵，计划动作需静态保持 |
| `band_dorsiflexion` | GIF 与计划的固定方式不同 |
| `band_ankle_eversion` | GIF 为踝关节环绕，计划动作是抗阻外翻 |
| `towel_toe_curl` | GIF 为踝关节环绕，计划动作是脚趾抓毛巾 |
| `short_foot` | GIF 为踝关节环绕，计划动作是足弓主动收缩 |
| `nordic_hamstring_eccentric` | GIF 为辅助式反向腿弯举，计划动作是北欧离心 |
| `low_pogo_hops` | GIF 为半蹲跳，计划动作是低幅度弹跳 |
| `fast_step_up` | GIF 为普通登阶，计划动作强调快速蹬伸 |
| `swimming` | GIF 为陆上打腿，计划动作为水中游泳 |

其中足踝、跳箱等动作的准确 Gym Visual 素材存在于更大的官方目录，但不在固定的 1324 条数据中；本次没有购买新素材。后续如取得对应 GIF，可按同一动作 ID 替换映射，不影响训练记录。
