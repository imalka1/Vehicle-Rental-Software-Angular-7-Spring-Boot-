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

@WebServlet(urlPatterns = {"/get_customer_via_email"})
public class CustomerURLController extends HttpServlet {

    private void getCustomerViaEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Customer customer = new CustomerDAO().getCustomerViaEmail(req.getParameter("customerEmail"));
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getServletPath();
        switch (path) {
            case "/get_customer_via_email":
                getCustomerViaEmail(req, resp);
                break;
//            case SERLVET_ONE:
//                // ... call your function2
//                break;
//
//            case SERLVET_TWO:
//                // ... call your function3
//                break;
            default:
                break;
        }
    }
}
