import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/api'; // Import the userService

const UserProfile = () => {
  const { currentUser, refresh } = useAuth();
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // Fixed validation schema to avoid cyclic dependency
  const formik = useFormik({
    initialValues: {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      // Fix cyclic dependency by using .when() only once
      currentPassword: Yup.string()
        .test('password-change', 'Current password is required to set a new password', function(value) {
          return !this.parent.newPassword || !!value;
        }),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .test('password-change', 'New password is required when current password is provided', function(value) {
          return !this.parent.currentPassword || !!value;
        }),
      confirmPassword: Yup.string()
        .test('passwords-match', 'Passwords must match', function(value) {
          return !this.parent.newPassword || value === this.parent.newPassword;
        })
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Create the update data object according to the OpenAPI spec
        const userData = {
          email: values.email,
        };

        // Only include password if the user is changing their password
        if (changePassword && values.currentPassword && values.newPassword) {
          userData.password = values.newPassword;
          userData.current_password = values.currentPassword;
        }

        // Use the userService instead of direct API call
        await userService.updateProfile(userData);
        
        toast.success('Profile updated successfully');
        
        // Reset password fields
        formik.setFieldValue('currentPassword', '');
        formik.setFieldValue('newPassword', '');
        formik.setFieldValue('confirmPassword', '');
        setChangePassword(false);
        
        // Refresh user data
        refresh();
      } catch (error) {
        console.error('Failed to update profile:', error);
        
        if (error.response) {
          if (error.response.status === 401) {
            toast.error('Your session has expired. Please log in again.');
          } else {
            toast.error(error.response.data?.detail || 'Failed to update profile');
          }
        } else if (error.request) {
          toast.error('Server not responding. Please try again later.');
        } else {
          toast.error('An error occurred: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formik.values.username}
                    disabled={true} // Username cannot be changed based on API spec
                    className="bg-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      formik.touched.email && formik.errors.email ? 'border-red-300' : ''
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <input
                    id="change-password"
                    name="change-password"
                    type="checkbox"
                    checked={changePassword}
                    onChange={() => setChangePassword(!changePassword)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="change-password" className="ml-2 block text-sm text-gray-900">
                    Change password
                  </label>
                </div>
              </div>

              {changePassword && (
                <>
                  <div className="sm:col-span-6">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.currentPassword && formik.errors.currentPassword ? 'border-red-300' : ''
                        }`}
                      />
                      {formik.touched.currentPassword && formik.errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.currentPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.newPassword && formik.errors.newPassword ? 'border-red-300' : ''
                        }`}
                      />
                      {formik.touched.newPassword && formik.errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : ''
                        }`}
                      />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setChangePassword(false);
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Profile Information */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Account Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your account and preferences.</p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentUser?.username}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentUser?.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentUser?.is_admin ? 'Administrator' : 'User'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Account Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
