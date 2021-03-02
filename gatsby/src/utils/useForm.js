import { useState } from 'react';

const useForm = (defaults) => {
   const [values, setValues] = useState(defaults);

   const updateValues = (e) => {
      // check if it is a number and convert
      let { value } = e.target;
      if (e.target.type === 'number') {
         value = parseInt(e.target.value);
      }
      setValues({
         // copy the existing values
         ...values,
         // update the new value that changed
         [e.target.name]: value,
      });
   };

   return { values, updateValues };
};

export default useForm;
