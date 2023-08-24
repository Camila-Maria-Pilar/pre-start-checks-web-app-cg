const { AuthenticationError } = require('apollo-server-express');

const checkRole = (user, requiredRoles, operation) => {
  if (!user) {
    throw new AuthenticationError('Not Authenticated');
  }

  if (!requiredRoles.includes(user.role)) {
    throw new AuthenticationError(`Not Authorized to ${operation}`);
  }
};

module.exports = {
  checkRole,
  
};
