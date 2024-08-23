import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  return (
    <div className="container-fluid p-0">
      <main>
        <section className="banner text-center text-white d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: 'url("your-banner-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '50vh', padding: '60px 0' }}>
          <div className="container">
            <h1 className="display-4 fw-bold">Welcome to SpendWise</h1>
            <p className="lead">Your comprehensive solution for tracking, managing, and analyzing expenses effortlessly. SpendWise empowers both individuals and organizations to streamline their expense management process, ensuring accuracy, efficiency, and valuable insights.</p>
          </div>
        </section>

        <section className="features py-5" >
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card shadow-sm border-dark">
                  <div className="card-body">
                    <h2 className="h4 card-title">Monitor Your Expenses</h2>
                    <p className="card-text">Keep track of all your expenses in one place. Our intuitive dashboard provides a clear overview of your spending, helping you stay on top of your financial goals.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card shadow-sm border-dark">
                  <div className="card-body">
                    <h2 className="h4 card-title">Manage Your Budget</h2>
                    <p className="card-text">Create and manage budgets with ease. Set spending limits, track progress, and make adjustments to ensure you stay within your budget.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card shadow-sm border-dark">
                  <div className="card-body">
                    <h2 className="h4 card-title">Analyze Your Spending</h2>
                    <p className="card-text">Gain valuable insights into your spending patterns with our advanced analytics tools. Generate reports, visualize data, and make informed financial decisions.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card shadow-sm border-dark">
                  <div className="card-body">
                    <h2 className="h4 card-title">Streamline Expense Reporting</h2>
                    <p className="card-text">Submit and approve expense reports seamlessly. Our system simplifies the process of reporting and approving expenses, reducing administrative overhead and improving efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta text-center bg-light py-5" >
          <div className="container" >
            <h2 className="display-4">Get Started Today!</h2>
            <p className="lead">Experience the benefits of SpendWise firsthand. Sign up now and take control of your expenses with our powerful tools and features.</p>
            <a href="/choice" className="btn btn-primary btn-lg">Sign Up</a>
          </div>
        </section>
      </main>

      <footer className="footer bg-dark text-white py-3">
        <div className="container text-center">
          <p className="mb-0">© 2024 SpendWise. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
