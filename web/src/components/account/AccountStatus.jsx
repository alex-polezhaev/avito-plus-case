import React from 'react';
import { Badge } from '@chakra-ui/react';
import { formatDateDMYNum } from '../../api/dateFormater.js';

const AccountStatus = ({ expire_at, archived }) => {
  const expireDate = new Date(expire_at);
  const today = new Date();
  if (expireDate >= today && !archived) {
    return (
      <Badge variant='solid' colorScheme='green'>
        Active until {formatDateDMYNum(expireDate)}
      </Badge>
    );
  } else if (expireDate <= today && !archived) {
    return (
      <Badge variant='solid' colorScheme='orange'>
        Stopped since {formatDateDMYNum(expireDate)}
      </Badge>
    );
  } else if (archived) {
    return (
      <Badge variant='solid' colorScheme='gray'>
        Archived
      </Badge>
    );
  } else {
    return (
      <Badge variant='solid' colorScheme='red'>
        Contact support
      </Badge>
    );
  }
};

export default AccountStatus;
