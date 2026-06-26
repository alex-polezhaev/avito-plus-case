/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import { api } from '../../api/index.js';
import { oneMinuteTableScripts } from '../oneMinuteTableScripts.js';

export const startOneMinuteScripts = async () => {
  while (true) {
    try {
      const accs = await api('mongo')
        .get('/accounts')
        .then(({ data }) => data);

      for (let i = 0; i < accs.length; i += 1) {
        const acc = accs[i];
        try {
          await oneMinuteTableScripts(acc);
          console.log(`Started ${acc.title}`);
        } catch (error) {
          console.log(`Error while running oms ${JSON.stringify(acc)}`);
        }
      }
    } catch (error) {
      console.log('Error starting oms');
      console.log(error);
    }
  }
};
