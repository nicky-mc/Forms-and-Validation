import PropTypes from "prop-types";

export default function RefactoredForm({ formValues, onFormChange }) {
  function handleInputChange(event) {
    const { name, value } = event.target;
    onFormChange({ [name]: value });
  }

  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={formValues.name}
        onChange={handleInputChange}
        placeholder="Please enter your full name"
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        required
        value={formValues.location}
        onChange={handleInputChange}
        placeholder="Please enter your home location"
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        id="job"
        name="job"
        required
        value={formValues.job}
        onChange={handleInputChange}
        placeholder="Please enter current occupation or if Unemployed or a Student"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        value={formValues.email}
        onChange={handleInputChange}
        placeholder="Please enter your email"
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        value={formValues.phone}
        onChange={handleInputChange}
        placeholder="Please enter your phone number"
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        required
        value={formValues.address}
        onChange={handleInputChange}
        placeholder="Please enter your address"
      />
    </>
  );
}

RefactoredForm.propTypes = {
  formValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
};
