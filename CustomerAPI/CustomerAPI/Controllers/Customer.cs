using CustomerAPI.Constants;
using Microsoft.AspNetCore.Mvc;
using Repository.Abstract;
using Repository.Model;
using System.Net;

namespace CustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Customer : ControllerBase
    {
        private ICustomerMaster _customerMaster;

        public Customer(ICustomerMaster customerMaster)
        {
            _customerMaster = customerMaster;
        }

        //Get all customers from datbase
        [HttpGet("all")]
        public Response GetAllCustomers()
        {
            var result = _customerMaster.GetAllCustomers();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getcustomerbyid/{userId}")]
        public Response GetCustomerById(int userId)
        {
            var result = _customerMaster.GetUserById(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("add")]
        public Response Add([FromBody] CustomerMasterModel customerMaster)
        {
            var result = _customerMaster.AddCustomer(customerMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("update")]
        public Response Update([FromBody] CustomerMasterModel customerMaster)
        {
            var result = _customerMaster.UpdateCustomer(customerMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpDelete("delete/{userId}")]
        public Response Delete(int userId)
        {
            var result = _customerMaster.DeleteCustomer(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}