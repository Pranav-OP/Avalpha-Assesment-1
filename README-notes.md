# Avalpha Technologies – Commission Calculator

A simple full-stack commission calculator web app built with **React** and **.NET 8**.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (CRA), JavaScript |
| Backend | ASP.NET Core Web API (C#) |
| Tests | Jest + React Testing Library (UI) <br> xUnit (Backend) |

---

## 🚀 How to Run the Application

### **Backend (.NET API)**

1. Navigate to the API folder  
   ```bash
   cd api
   ```

2. Restore dependencies  
   ```bash
   dotnet restore
   ```

3. Build and run  
   ```bash
   dotnet run
   ```
   The API will start at:  
   👉 `https://localhost:5000`  
   Swagger UI available at:  
   👉 `https://localhost:5000/swagger`

---

### **Frontend (React App)**

1. Navigate to the UI folder  
   ```bash
   cd ui
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Run the app  
   ```bash
   npm start
   ```

4. Open your browser at  
   👉 `http://localhost:3000`

---

## 🧪 How to Run Tests

### **Backend Tests (xUnit)**

1. Go to the test project folder (e.g., `AvalphaTechnologies.CommissionCalculator.Tests`)  
   ```bash
   cd api.Tests
   ```
2. Run tests  
   ```bash
   dotnet test
   ```

---

### **Frontend Tests (React Testing Library + Jest)**

1. From the UI folder, run:
   ```bash
   npm test
   ```
2. Press `a` to run all tests or `q` to quit.

Example output:
```
PASS src/App.test.js
✓ renders the main title
✓ shows validation messages when fields are empty
✓ shows validation error for zero or negative values
✓ removes validation errors after entering valid input
```

---

## 🧠 Design Decisions

### **Backend**
- Built using **ASP.NET Core MVC Controller** style for clarity.  
- Uses a **service layer (`CommissionCalculatorService`)** to keep business logic separate.  
- Returns formatted commission results and advantage values as JSON.  
- Added `InvariantGlobalization = false` to support culture-specific formatting (`en-GB`).

### **Frontend**
- Implemented using **Create React App**.  
- Uses React Hooks (`useState`) for form handling and validation.  
- Minimal CSS and markup for clarity; focus is on functionality.  
- Client-side validations ensure correct numeric input before sending API request.  
- Fetch API used for simplicity instead of Axios.

### **Testing**
- **Frontend:** React Testing Library used to validate form rendering, validation messages, and user interactions.  
- **Backend:** xUnit tests validate calculation logic and API responses.

---

## 📁 Folder Structure

```
Avalpha-Assesment-1/
│
├── api/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── AvalphaTechnologies.CommissionCalculator.csproj
│   └── Program.cs
│
├── avalphaTechnologies.CommissionCalculator.Tests/              # xUnit project
│
├── ui/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── setupTests.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚡ Optional Notes
- The backend is CORS-enabled to allow local React requests.
- No database is used; all computations are in-memory.
- Currency formatting uses British Pound (`£`) consistent with `en-GB` locale.

---

✅ **Deliverables Summary**
| Requirement | Status |
|--------------|----------|
| Working Backend API | ✅ |
| Working React UI | ✅ |
| Client-side Validation | ✅ |
| xUnit Backend Tests | ✅ |
| Jest + RTL Frontend Tests | ✅ |
| Documentation (README) | ✅ |
