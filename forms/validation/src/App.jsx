import { useState } from "react";
import RefactoredForm from "./components/RefactoredForm";

export default function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    job: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleFormChange(newValues) {
    setFormValues((prevValues) => ({ ...prevValues, ...newValues }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
    // Here you can add logic to handle the form submission
    updateLocalStorage(formValues);
    // Reset form after submission
    setFormValues({
      name: "",
      location: "",
      job: "",
      email: "",
      phone: "",
      address: "",
    });
  }

  function updateLocalStorage(updatedFormData) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    formDataArray.push(updatedFormData);
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
  }

  return (
    <div className="App">
      <header>
        <h1>Forms and Validation</h1>
      </header>
      <main>
        <h2>React App</h2>
        <form onSubmit={handleSubmit}>
          <RefactoredForm
            formValues={formValues}
            onFormChange={handleFormChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="current-input">
          <h3>Current Input:</h3>
          <p>
            <strong>Name:</strong> {formValues.name}
          </p>
          <p>
            <strong>Location:</strong> {formValues.location}
          </p>
          <p>
            <strong>Job:</strong> {formValues.job}
          </p>
          <p>
            <strong>Email:</strong> {formValues.email}
          </p>
          <p>
            <strong>Phone:</strong> {formValues.phone}
          </p>
          <p>
            <strong>Address:</strong> {formValues.address}
          </p>
        </div>
      </main>
      <footer>
        <p>&copy; Nicky Mortoza-Cowles 2024</p>
      </footer>
    </div>
  );
}
