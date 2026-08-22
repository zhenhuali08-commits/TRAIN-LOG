# TRAIN LOG V3.2.1 LOCAL

本地无 D1 版本。训练数据使用 IndexedDB 分库存储，并保留一键 JSON 备份/一键恢复。首次升级会自动迁移旧版 localStorage 数据。

V3.1 重点：
- 肌群恢复改为按近 7 天训练、组数、次数、相对重量、主/辅助肌群及有氧负荷叠加计算
- 力量趋势新增 Epley 公式估算 1RM
- IndexedDB 分为 workouts / exercises / plans / body_metrics / settings / backup_meta
- 设置页显示上次备份与 14 天备份提醒
- 训练肌群图改为全矢量分层 SVG，每块肌肉独立着色
- 记录统计新增日报、周报、月报、年报
- 已结束训练支持编辑日期、名称、重量、次数和组数

V3.2 重点：
- 训练肌群图换成更接近正式健身应用的正反面分层 SVG 人体模板
- 更新应用图标，移除图标外部背景
- 修复首页“记录数据”和身体数据记录入口
- 身体数据记录支持修改与删除
- 日报、周报、月报、年报支持选择具体统计周期
- 优化动作 GIF 首屏直出与滚动稳定性

V2.3 重点：
- 首页体重/体脂、我的体重/腰围严格等宽等高
- Gym Visual 动图增加固定映射、持久缓存、多 CDN 重试与 PWA 媒体缓存
- 新增哑铃推肩、器械卷腹、仰卧起坐、抬腿、平板蝴蝶收腹、仰卧抬腿、上斜卷腹转体、负重俄罗斯转体、单手悍马机划船、辅助引体、酒杯深蹲、反向哈克深蹲及更多三头动作
- 移除杠铃臀推、绳索后踢腿、健腹轮、划船机、跳绳、游泳；坡度走更名为爬坡走
- 递减组移除三点并与主行严格对齐
- 添加动作支持自定义动作
- 动作详情固定为 01 3D动图 / 02 视频讲解 / 03 动作要点 / 04 常见错误 / 05 训练肌群图
- 训练肌群图升级为正反面人体，红主肌群、橙辅助肌群、白灰非主要肌群

## V2.5 targeted fixes
- Corrected Gym Visual selection logic for standard high lat pulldown, standing rope face pull, and incline treadmill walk; media cache version bumped to avoid stale mappings.
- Tutorial modal always opens from the top.
- 3D GIF area has a dedicated full-screen viewer with two-finger zoom/pan; global app zoom behavior is unchanged.
- Tutorial exercise name/title enlarged only inside exercise tutorial UI.
- All built-in exercises receive expanded, practical movement cues and common-error guidance; bench press / lat pulldown / face pull / incline walk receive dedicated detailed guides.
- Training muscle map rebuilt on formal front/back anatomical bases and reused for all exercises.
- Mine page tab state is normalized and content has a fallback render guard.
