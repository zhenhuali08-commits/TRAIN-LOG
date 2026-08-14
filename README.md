# TRAIN LOG

手机优先的私人健身记录 PWA。第一版重点是：快速记录、训练计划、体力/肌群恢复、动作教学、身体数据趋势，以及定制健身饮食推荐。

## 已实现

- 首页：距离上次健身、体力恢复、肌群恢复、下一练、本周训练概览
- 训练：每组重量/次数/RIR、复制上次重量、组间休息计时、训练容量、快速文本记录
- 计划：按“第 1 练 → 第 4 练”循环，不绑定星期几
- 动作库：常用动作分类、搜索、动作要点、常见错误、主要/辅助肌群
- 数据：体重、体脂、腰围、骨骼肌、去脂体重；7 日平均体重；力量历史
- 饮食：只提供训练日/休息日的定制建议和一天饮食示例，不做日常饮食记录
- PWA：可添加到 iPhone 主屏幕，支持静态资源离线缓存
- 数据：默认先存浏览器 localStorage；Cloudflare D1 配置后自动同步

## 已明确不做

- 日常饮食打卡/热量记录
- 身体变化照片
- 社区、好友、排行榜
- 第一版不接 Apple Health / COROS

## Cloudflare Pages 部署

本项目是无构建步骤的静态 HTML + Pages Functions：

- Build command: `exit 0`
- Build output directory: `.`

Pages Functions 位于 `/functions`，D1 binding 名必须叫 `DB`。

### 1. 创建 D1

在 Cloudflare Dashboard 创建名为 `train-log-db` 的 D1 数据库。

### 2. 初始化数据库

可在 D1 Console 执行：

```sql
CREATE TABLE IF NOT EXISTS app_state (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

或者使用 Wrangler：

```bash
npx wrangler d1 execute train-log-db --remote --file=./migrations/0001_init.sql
```

### 3. 给 Pages 绑定 D1

Pages 项目 → Settings → Bindings → Add → D1 database bindings：

- Variable name: `DB`
- D1 database: `train-log-db`

绑定后重新部署。

## 数据说明

这是单人私人工具，所以第一版 D1 使用一个 JSON state 快照来最大限度减少部署复杂度。前端内部数据仍然按 workout → exercise → set、bodyMetrics、wellness 等结构组织。需要多人账户或复杂统计时再迁移成完整关系表即可。

## 饮食与训练计划来源

第一版预置内容按当前《健身训练与饮食计划·重新开始版》结构录入：正式阶段每周 4 练；训练日约 2400 kcal / 蛋白质 150 g / 脂肪 65 g / 碳水 300 g，休息日约 2200 kcal / 蛋白质 150 g / 脂肪 70 g / 碳水 240 g。
