<jsp:include page="../header.jsp"/>
<jsp:include page="../nav_bar.jsp"/>
<jsp:include page="../carousel.jsp"/>

<%
    HttpSession sessionLogin = request.getSession(false);
    if (sessionLogin.getAttribute("accountType") == null) {
%>
<jsp:forward page="../admin/login.jsp"/>
<%
    }
%>

<section id="about" style="padding-top: 50px;padding-bottom: 90px">
    <div class="container">

    </div>
</section>

<jsp:include page="../footer.jsp"/>