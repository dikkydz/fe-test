# 📧 Email Recipients Visual Quiz

A frontend quiz solution built with **React + TypeScript + Vite**.  
Implements a dynamic email cell component that adapts to column width, following the given challenge checklist.

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/dikkydz/fe-test
cd fe-test
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the example file:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` to add your credentials:

```
VITE_API_AUTH=your_base64_credentials_here
```

> ⚠️ Replace `your_base64_credentials_here` with the actual Base64 string provided in the assignment.  
> Do **not** commit `.env.local` to GitHub.

### 4. Run the project
```bash
npm run dev
```

Then open:  
- [http://localhost:5173](http://localhost:5173) → Email Quiz main page  

---

## 📦 Project Structure

```
src/
 ├── components/
 │    ├── EmailCell.tsx       # Final solution component
 │    ├── EmailCellQuiz.tsx   # Quiz runner with table & cases
 ├── styles/
 │    └── quiz.css            # Styling
 ├── App.tsx
 └── main.tsx
```

---

## 🧪 Features & Assumptions

- Uses **ResizeObserver** to measure column width in real time.
- Uses **Canvas API** to measure actual text width (font-aware).
- `+N` badge shows hidden recipients with tooltip containing the full list.
- Accessible: badge has `aria-label`.
- Edge cases handled:
  - Empty → `–`
  - One long email → truncated with ellipsis
  - Duplicates are shown as-is
- Submission page (`/submit`) allows sending solution metadata (`name`, `email`, `repo_url`) to the provided endpoint with Basic Auth from `.env`.

---

## 🔑 Notes

- Node **18+** or **20+** required.
- No secrets are committed; all credentials must be placed in `.env.local`.

---

## 📂 Example Environment File

Create `.env.local` from this example:

```env
# .env.local.example
# Copy this file to .env.local and replace with your real values.
API_AUTH=your_base64_credentials_here
SUBMIT_NAME=Your Full Name
SUBMIT_EMAIL=your@email.com
SUBMIT_REPO_URL=https://github.com/your-username/fe-test
```
