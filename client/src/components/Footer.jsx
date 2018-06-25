import React from 'react';

const Footer = () => (
  <div>
    <footer className="page-footer font-small bg-light">
      <div className="container text-center text-md-left">
        <div className="row my-4" style={{ marginTop: '50px' }}>
          <div className="col-md-4 col-lg-4">
            <h5
              className="text-uppercase mb-4 font-weight-bold"
              style={{ marginTop: '50px' }}
            >
              BlackSmithPost
            </h5>
            <p style={{ textAlign: 'justify', fontStyle: 'italic' }}>
              {' '}
              "Under a spreading chestnut-tree The village smithy stands; The
              smith, a mighty man is he, With large and sinewy hands; And the
              muscles of his brawny arms Are strong as iron bands."
            </p>
            <p style={{ fontStyle: 'italic' }}>
              Speak softly but carry a big sword - Joe Ford{' '}
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div
            className="col-md-2 col-lg-2 ml-auto"
            style={{ marginTop: '50px' }}
          >
            <h5 className="text-uppercase mb-4 font-weight-bold">About</h5>
            <ul className="list-unstyled">
              <p>
                <a href="https://www.youtube.com/watch?v=h-I7-gF4rJQ">Legal</a>
              </p>
              <p>
                <a href="#!">About Us</a>
              </p>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-4 col-lg-3" style={{ marginTop: '50px' }}>
            <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>

            <p>
              <i className="fa fa-home mr-3" /> 1066 Faire St., Anvilton, Ye
              Olde Englande
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> info@blacksmithpost.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> + 01 800 888 8888
            </p>
            <p>
              <i className="fa fa-print mr-3" /> + 01 800 867 5309
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div
            className="col-md-2 col-lg-2 text-center"
            style={{ marginTop: '50px' }}
          >
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>

            <div className="mt-2 ">
              <button type="button" className="btn btn-fb">
                <i className="fa fa-facebook" />
              </button>

              <button type="button" className="btn btn-tw">
                <i className="fa fa-twitter" />
              </button>

              <button type="button" className="btn btn-gplus">
                <i className="fa fa-google-plus" />
              </button>

              <button type="button" className="btn btn-yt">
                <i className="fa fa-youtbue" />
              </button>
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
);

export default Footer;
