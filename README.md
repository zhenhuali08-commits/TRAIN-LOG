# TRAIN LOG V2.3 LOCAL

本地无 D1 版本。训练数据使用浏览器本地存储，并提供一键备份/一键恢复。

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
