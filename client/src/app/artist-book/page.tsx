"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./page.scss";

const categoryOptions = ["Singer", "Dancer", "Painter", "Actor"];
const languageOptions = ["English", "Hindi", "Spanish", "French"];
const feeRanges = ["$0 - $100", "$100 - $500", "$500 - $1000", "$1000+"];

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
  category: Yup.array().min(1, "Select at least one category"),
  languages: Yup.array().min(1, "Select at least one language"),
  feeRange: Yup.string().required("Fee range is required"),
  location: Yup.string().required("Location is required"),
});

const ArtistForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form className="artist-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Artist Details</h2>

      {/* Name */}
      <div className="form-group">
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      {/* Bio */}
      <div className="form-group">
        <label>Bio</label>
        <textarea {...register("bio")} />
        {errors.bio && <p className="error">{errors.bio.message}</p>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label>Category</label>
        <div className="multi-checkbox">
          {categoryOptions.map((cat) => (
            <label key={cat}>
              <input type="checkbox" value={cat} {...register("category")} />
              {cat}
            </label>
          ))}
        </div>
        {errors.category && <p className="error">{errors.category.message}</p>}
      </div>

      {/* Languages */}
      <div className="form-group">
        <label>Languages Spoken</label>
        <div className="multi-checkbox">
          {languageOptions.map((lang) => (
            <label key={lang}>
              <input type="checkbox" value={lang} {...register("languages")} />
              {lang}
            </label>
          ))}
        </div>
        {errors.languages && (
          <p className="error">{errors.languages.message}</p>
        )}
      </div>

      {/* Fee Range */}
      <div className="form-group">
        <label>Fee Range</label>
        <select {...register("feeRange")}>
          <option value="">Select a range</option>
          {feeRanges.map((fee) => (
            <option key={fee} value={fee}>
              {fee}
            </option>
          ))}
        </select>
        {errors.feeRange && <p className="error">{errors.feeRange.message}</p>}
      </div>

      {/* Profile Image */}
      <div className="form-group">
        <label>Profile Image (optional)</label>
        <input type="file" {...register("profileImage")} />
      </div>

      {/* Location */}
      <div className="form-group">
        <label>Location</label>
        <input type="text" {...register("location")} />
        {errors.location && <p className="error">{errors.location.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ArtistForm;
