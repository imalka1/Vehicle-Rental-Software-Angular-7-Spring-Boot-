package com.vrs.controller.customer;

import com.vrs.dao.CustomerDAO;
import com.vrs.entity.Customer;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/get_customer_via_email")
public class GetCustomerViaEmail extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Customer customer = new CustomerDAO().getCustomerViaEmail(req.getParameter("customerEmail"));
        JSONObject customerJson = new JSONObject();//---Creates a JSON object {}

        if (customer != null) {
            customerJson.put("CustomerId", customer.getId());
            customerJson.put("CustomerName", customer.getCustomerName());
            customerJson.put("CustomerContactNo", customer.getCustomerContactNumber());
        } else {
            customerJson.put("CustomerId", 0);
            customerJson.put("CustomerName", "");
            customerJson.put("CustomerContactNo", "");
        }
        resp.getWriter().println(customerJson.toJSONString());//---Print and reply JSON as a text
    }
}
