import React from 'react';

//was not able to get the social media buttons to work
//basic footer otherwise, about and legal page need to be done.
const Footer = () => (
    <div>
      <footer className="page-footer font-small bg-light">
          <div className="container text-center text-md-left">
              <div className="row my-4">


                  <div className="col-md-4 col-lg-4">
                      <h5 className="text-uppercase mb-4 font-weight-bold">BlackSmithPost</h5>
                      <p>A relic of the past may be a treasure of the future - Joe F</p>
                      <p>
                          Speak softly but carry a big Sword - Joe F </p>
                  </div>


                  <hr className="clearfix w-100 d-md-none" />


                  <div className="col-md-2 col-lg-2 ml-auto">
                      <h5 className="text-uppercase mb-4 font-weight-bold">About</h5>
                      <ul className="list-unstyled">
                          <p><a href="#!">Legal</a></p>
                          <p><a href="#!">About Us</a></p>
                      </ul>
                  </div>


                  <hr className="clearfix w-100 d-md-none" />


                  <div className="col-md-4 col-lg-3">
                      <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>

                      <p><i className="fa fa-home mr-3"></i> Fort Lauderdale, FL 10012, US</p>
                      <p><i className="fa fa-envelope mr-3"></i> info@blacksmithpost.com</p>
                      <p><i className="fa fa-phone mr-3"></i> + 01 800 888 8888</p>
                      <p><i className="fa fa-print mr-3"></i> + 01 800 867 5309</p>
                  </div>


                  <hr className="clearfix w-100 d-md-none" />


                  <div className="col-md-2 col-lg-2 text-center">
                      <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>

                      <div className="mt-2 ">

                          <button type="button" className="btn btn-fb"><i className="fa fa-facebook"></i></button>

                          <button type="button" className="btn btn-tw"><i className="fa fa-twitter"></i></button>

                          <button type="button" className="btn btn-gplus"><i className="fa fa-google-plus"></i></button>

                          <button type="button" className="btn btn-yt"><i className="fa fa-youtbue"></i></button>
                      </div>
                  </div>


              </div>
          </div>

          <div className="footer-copyright py-3 text-center">
              <div className="container-fluid">
                  <h6>© 2018 Copyright: BlackSmithPost </h6>

              </div>
          </div>


      </footer>
    </div>

)

export default Footer;