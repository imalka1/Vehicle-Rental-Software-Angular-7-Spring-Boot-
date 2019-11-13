package com.vrs.service;

import com.vrs.dao.CustomerDAO;
import com.vrs.entity.Customer;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomerService {

    private CustomerDAO customerDAO = new CustomerDAO();

    public void getCustomerViaEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Customer customer = customerDAO.getCustomerViaEmail(req.getParameter("customerEmail"));
        JSONObject customerJson = new JSONObject();//---Creates a JSON object {}

        if (customer != null) {
            customerJson.put("CustomerName", customer.getCustomerName());
            customerJson.put("CustomerContactNo", customer.getCustomerContactNumber());
        } else {
            customerJson.put("CustomerName", "");
            customerJson.put("CustomerContactNo", "");
        }
        resp.getWriter().println(customerJson.toJSONString());//---Print and reply JSON as a text
    }

}
