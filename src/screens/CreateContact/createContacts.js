import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateContactComponent from '../../components/CreateContactComponent';
import {CONTACT_DETAIL, CONTACT_LIST} from '../../constants/routeNames';
import createContact from '../../context/actions/contacts/createContact';
import editContact from '../../context/actions/contacts/editContact';
import {GlobalContext} from '../../context/GlobalProvider';
import uploadImage from '../../helpers/uploadImage';
import countryCode from '../../utils/countryCode';

const CreateContact = () => {
  const [form, setForm] = useState({});
  const {navigate, setOptions} = useNavigation();
  const sheetRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    contactDispatch,
    contactState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  const {params} = useRoute();

  useEffect(() => {
    if (params?.item) {
      const {
        first_name,
        last_name,
        phone_number,
        is_favorite,
        country_code,
        contact_picture,
      } = params.item;

      setOptions({
        title: 'Update Contact',
      });

      setForm(prev => {
        return {
          ...prev,
          first_name,
          last_name,
          phone_number,
          is_favorite,
          country_code,
          contact_picture,
        };
      });

      const country = countryCode.find(item => {
        return item.dial_code.replace('+', '') === country_code;
      });

      if (country) {
        setForm(prev => {
          return {...prev, country_code: country.code.toUpperCase()};
        });
      }
    }

    if (params?.item.contact_picture) {
      setImageFile(params?.item.contact_picture);
    }
  }, []);

  const onChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (params?.item) {
      if (imageFile?.size) {
        setIsUploading(true);
        uploadImage(imageFile)(url => {
          setIsUploading(false);
          editContact(
            {...form, contact_picture: url},
            params?.item.id,
          )(contactDispatch)(item => navigate(CONTACT_DETAIL, {item}));
        })(err => {
          setIsUploading(false);
          console.log(err);
        });
      } else {
        editContact(form, params?.item.id)(contactDispatch)(item =>
          navigate(CONTACT_DETAIL, {item}),
        );
      }
    } else {
      if (imageFile?.size) {
        setIsUploading(true);
        uploadImage(imageFile)(url => {
          setIsUploading(false);
          createContact({...form, contact_picture: url})(contactDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(err => {
          setIsUploading(false);
          console.log(err);
        });
      } else {
        createContact(form)(contactDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    setImageFile(image);
  };

  return (
    <CreateContactComponent
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      setForm={setForm}
      loading={loading || isUploading}
      error={error}
      sheetRef={sheetRef}
      openSheet={openSheet}
      closeSheet={closeSheet}
      onFileSelected={onFileSelected}
      imageFile={imageFile}
    />
  );
};

export default CreateContact;
