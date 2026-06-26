import React, { useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Select,
  Switch,
  HStack,
  FormControl,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { IoMdSettings } from 'react-icons/io';
import { getMoneyDiffBetweenTarif } from '../../api/tariffFuncs';
import { editAccountData } from '../../api/accountsBackend';
import { useDispatch, useSelector } from 'react-redux';
import { getAccs } from '../../redux/slices/accountsSlice';
import { tariffChange } from '../../api/servicesBackend';
import { fetchUserData } from '../../redux/slices/userSlice';

const ModalPaymentSettings = ({ acc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState();
  const [alerting, setAlerting] = useState();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tariff: acc.month_price,
      renewSwitch: acc.renewable,
    },
    onSubmit: ({ tariff, renewSwitch }) => {
      setLoading(true);
      Promise.all([
        tariffChange({ accID: acc._id, newMonthPrice: tariff }, token),
        editAccountData(token, acc._id, { renewable: renewSwitch }, token),
      ])
        .then(() => {
          dispatch(getAccs(token));
          dispatch(fetchUserData(token));
          setLoading(false);
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          err.message === 'Network Error'
            ? setAlerting('Service unavailable, please try again in 5 minutes')
            : setAlerting(err.response.data.message);
        });
    },
  });

  return (
    <>
      <Button
        size={'sm'}
        variant={'outline'}
        colorScheme='purple'
        onClick={onOpen}
        rightIcon={<IoMdSettings size={18} />}
      >
        Settings
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Payment settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text my={4}>Tariff (number of listings)</Text>
                <Select
                  mb={5}
                  name='tariff'
                  onChange={formik.handleChange}
                  value={formik.values.tariff}
                >
                  <option value={1490}>
                    Up to 1000 listings (1490 rub/mo)
                  </option>
                  <option value={2900}>
                    Up to 5000 listings (2900 rub/mo)
                  </option>
                  <option value={3900}>
                    Up to 10000 listings (3900 rub/mo)
                  </option>
                  <option value={5900}>Unlimited (5900 rub/mo)</option>
                </Select>
                <HStack>
                  <Switch
                    mr={2}
                    colorScheme={'purple'}
                    name='renewSwitch'
                    onChange={formik.handleChange}
                    isChecked={formik.values.renewSwitch}
                  />
                  <Text>Tariff auto-renewal</Text>
                </HStack>
                {formik.values.tariff != acc.month_price && (
                  <Alert my={3} colorScheme='orange' w={'full'}>
                    <AlertIcon />
                    <AlertDescription>
                      {`The selected tariff will be active for one month for  
                      ${getMoneyDiffBetweenTarif(
                        acc.month_price,
                        formik.values.tariff,
                        acc.expire_at,
                      )} rubles`}
                    </AlertDescription>
                  </Alert>
                )}
                {formik.values.renewSwitch != acc.renewable && (
                  <Alert my={3} colorScheme='red' w={'full'}>
                    <AlertIcon />
                    <AlertDescription>
                      You {acc.renewable ? 'disabling ' : 'enabling '}
                      auto-renewal, please be careful. Auto-renewal is
                      an automatic charge from your balance on the site,
                      required to extend the tariff for the next month.
                    </AlertDescription>
                  </Alert>
                )}
                {alerting && (
                  <Alert my={3} colorScheme='orange' w={'full'}>
                    <AlertIcon />
                    <AlertDescription>{alerting}</AlertDescription>
                  </Alert>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant='ghost' onClick={onClose} mr={3}>
                  Cancel
                </Button>
                <Button type='submit' colorScheme='purple' isLoading={loading}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </FormControl>
        </form>
      </Modal>
    </>
  );
};

export default ModalPaymentSettings;
