# SynTests

Synchronized multi-video comparison viewer for robot task evaluations.

🔗 **Live:** https://syntests.vercel.app

## Structure

```
public/
  index.html              ← landing page (all test sets)
  tests/
    cloth-folding/        ← test set folder
      index.html          ← comparison viewer
      *.mp4               ← video files
    [next-test]/
      ...
template/
  index.html              ← base template for new test sets
add-test.js               ← scaffold script for new tests
```

## Adding a New Test Set

### 1. Scaffold it
```bash
node add-test.js my-task-name
```

### 2. Drop in your MP4s
```
public/tests/my-task-name/
  original.mp4
  generated_1.mp4
  generated_2.mp4
  ...
```

### 3. Edit the videos array
Open `public/tests/my-task-name/index.html` and update:
```js
const videos = [
  { file: 'original.mp4',    type: 'original'  },
  { file: 'generated_1.mp4', type: 'generated' },
  { file: 'generated_2.mp4', type: 'generated' },
];
```

### 4. Add a card to the landing page
In `public/index.html`, add inside `.grid`:
```html
<a class="card" href="/tests/my-task-name/">
  <div class="card-title">My Task Name</div>
  <div class="card-meta">3 videos · 15s · 1 original, 2 generated</div>
  <div class="card-badge">task_my_task_name</div>
</a>
```

### 5. Deploy
```bash
npx vercel --prod
```

## Tips
- All videos should be the same length for proper sync
- Use ffmpeg to trim: `ffmpeg -i input.mp4 -t 15 -c copy output.mp4`
- Supports any number of videos (grid auto-adjusts columns)
