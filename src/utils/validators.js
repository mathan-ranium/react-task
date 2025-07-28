export const validateUser = (data) => {
  const errors = {};

  if (!data.first_name || data.first_name.trim() === '') {
    errors.first_name = 'First name is required';
  }

  if (!data.last_name || data.last_name.trim() === '') {
    errors.last_name = 'Last name is required';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  }

  // Optionally validate image URL
  if (!data.profile_link_image || data.profile_link_image.trim() === '') {
    errors.profile_link_image = 'Profile image URL is required';
  }

  return errors;
};
