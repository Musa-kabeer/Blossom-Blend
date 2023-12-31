import AccountUserProfile from './AccountUserProfile';
import AccountUserPassword from './AccountUserPassword';

const AccountInfo = () => {
     return (
          <div className='flex flex-col space-y-10 p-10 divide-y divide-gray-300'>
               <h1 className='text-[24px] font-bold'>Account Information</h1>

               <AccountUserProfile />

               <AccountUserPassword />
          </div>
     );
};

export default AccountInfo;
