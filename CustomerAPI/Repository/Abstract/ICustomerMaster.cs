using Repository.Model;
using System.Collections.Generic;

namespace Repository.Abstract
{
    public interface ICustomerMaster
    {
        IEnumerable<CustomerMasterModel> GetAllCustomers();

        bool AddCustomer(CustomerMasterModel customerMaster);

        bool UpdateCustomer(CustomerMasterModel customerMaster);

        CustomerMasterModel GetUserById(int userId);

        bool DeleteCustomer(int userId);
    }
}