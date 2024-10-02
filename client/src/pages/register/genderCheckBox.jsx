const GenderCheckbox = ({ selectedGender, onGenderChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onGenderChange(value);
  };

  return (
    <div className="flex gap-4">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={selectedGender === "Male"}
            onChange={handleChange}
            className="radio border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={selectedGender === "Female"}
            onChange={handleChange}
            className="radio border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
