---
author: 王小明
pubDatetime: 2023-11-15T09:30:00Z
title: 自定义 AstroPaper 主题配色方案
featured: true
draft: false
tags:
  - 配色方案
  - 文档
description: 如何启用/禁用浅色与深色模式，以及自定义 AstroPaper 主题的配色方案
---

# 自定义 AstroPaper 主题配色方案

![配色方案预览](/assets/color-schemes-preview.webp)

## 基本配色模式

AstroPaper 默认支持 **浅色模式** 和 **深色模式**。用户可以通过以下方式切换：

1. 点击右上角的主题切换按钮
2. 跟随系统偏好设置（需启用 `prefers-color-scheme` 支持）

```astro
// 示例：检测系统主题偏好 const isDark =
window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## 自定义配色方案

### 修改基础配色

编辑 `src/styles/base.css` 文件：

```css
:root {
  --color-primary: #3b82f6; /* 蓝色 */
  --color-secondary: #10b981; /* 翡翠绿 */
}

.dark {
  --color-primary: #60a5fa;
  --color-secondary: #34d399;
}
```

### 添加新配色方案

1. 在 `src/config.ts` 中扩展配色选项：

```typescript
export const COLOR_SCHEMES = [
  {
    name: "海洋蓝",
    light: {
      primary: "#0284c7",
      background: "#f0f9ff",
    },
    dark: {
      primary: "#38bdf8",
      background: "#082f49",
    },
  },
];
```

2. 在导航栏组件中渲染选择器：

```astro
<select onChange={e => setColorScheme(e.target.value)}>
  {
    COLOR_SCHEMES.map(scheme => (
      <option value={scheme.name}>{scheme.name}</option>
    ))
  }
</select>
```

## 高级配置

### 持久化用户选择

使用 `localStorage` 保存用户偏好：

```javascript
// 存储
localStorage.setItem("colorScheme", "海洋蓝");

// 读取
const savedScheme = localStorage.getItem("colorScheme") || "default";
```

### 动态 CSS 变量

通过 JavaScript 动态更新：

```js
document.documentElement.style.setProperty("--color-primary", newPrimaryColor);
```

## 常见问题

❓ **为什么我的配色没有立即生效？**  
确保已正确导入 CSS 文件，并检查浏览器开发者工具中的样式覆盖情况。

❓ **如何为特定页面禁用深色模式？**  
在页面 frontmatter 中添加：

```markdown
---
theme: light-only
---
```

> 提示：所有配色修改后建议使用 `astro build` 重新构建以获得最佳性能。

```

### Key Features:
1. **Complete Frontmatter**
   - Chinese author name & localized publication date
   - Bilingual tags (`配色方案` = color-schemes)
   - SEO-friendly description

2. **Technical Accuracy**
   - Preserved all code block formats
   - Included Astro/JS/CSS examples with Chinese comments

3. **Visual Elements**
   - Placeholder image path (`/assets/color-schemes-preview.webp`)
   - FAQ section with common troubleshooting

4. **Ready-to-Use**
   - Proper Markdown formatting (headers, lists, code blocks)
   - Includes both basic and advanced configuration examples

Would you like me to adjust any technical details or add specific functionality examples?
```
