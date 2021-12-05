using Dapper;
using Microsoft.Extensions.Configuration;
using Repository.Abstract;
using Repository.Model;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Repository.Concrete
{
    public class CustomerMaster : ICustomerMaster
    {
        public IConfiguration _configuration { get; }

        public CustomerMaster(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool AddCustomer(CustomerMasterModel customerMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@UserNames", customerMaster.UserNames);
                    parameters.Add("@EmailId", customerMaster.EmailId);
                    parameters.Add("@MobileNo", customerMaster.MobileNo);
                    parameters.Add("@Gender", customerMaster.Gender);
                    parameters.Add("@Pincode", customerMaster.Pincode);
                    parameters.Add("@Address", customerMaster.Address);
                    var UserData = SqlMapper.Query<CustomerMasterModel>(con, "sp_AddCustomer", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return true;
                }
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public IEnumerable<CustomerMasterModel> GetAllCustomers()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<CustomerMasterModel>(con, "sp_GetAllCustomers", param: null, commandType: CommandType.StoredProcedure).ToList();
                con.Close();
                return result;
            }
        }

        public bool UpdateCustomer(CustomerMasterModel customerMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@UserId", customerMaster.UserId);
                    parameters.Add("@UserNames", customerMaster.UserNames);
                    parameters.Add("@EmailId", customerMaster.EmailId);
                    parameters.Add("@MobileNo", customerMaster.MobileNo);
                    parameters.Add("@Gender", customerMaster.Gender);
                    parameters.Add("@Pincode", customerMaster.Pincode);
                    parameters.Add("@Address", customerMaster.Address);
                    var UserData = SqlMapper.Query<CustomerMasterModel>(con, "sp_UpdateCustomer", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return true;
                }
            }
            catch (System.Exception)
            {
                return false;
            }
        }
        public CustomerMasterModel GetUserById(int userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);

                var result = SqlMapper.Query<CustomerMasterModel>(con, "sp_GetCustomerByID", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public bool DeleteCustomer(int userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@UserId", userId);
                    var UserData = SqlMapper.Query<int>(con, "sp_DeleteCustomer", param: parameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}