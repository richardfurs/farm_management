import { Field } from '@/Types';

const ValidationRules = (field: Field) => {
	const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

  switch (field.name) {
    case 'email':
      return {
        required: false,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Invalid email format',
        },
      };
    case 'website':
      return {
        required: false,
				pattern: {
          value: urlPattern,
          message: 'Invalid URL. It must start with http:// or https:// and be a valid web address',
        },
      };
    case 'age':
      return {
        required: false
      };
    default:
      return {
        required: `${field.label} is required`,
      };
  }
}

export default ValidationRules;
