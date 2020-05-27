/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import { Link } from 'core/routes';
import { Container } from 'reactstrap';
import { withRouter } from 'next/router';
import { urlHelper } from 'utils';

class ErrorPage extends React.Component {
  static propTypes() {
    return {
      errorCode: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    };
  }

  static getInitialProps({ res, err, xhr }) {
    const errorCode = res
      ? res.statusCode
      : err
      ? err.statusCode
      : xhr
      ? xhr.status
      : null;
    return { errorCode };
  }

  render() {
    let response;

    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = (
          <>
            {/* <Head>
              <style dangerouslySetInnerHTML={{ __html: Styles }} />
            </Head> */}
            <Container className="pt-5 text-center">
              <h1 className="display-4">404</h1>
              <p>Trang bạn truy cập không tồn tại.</p>
              <p>
                <Link {...urlHelper.getUrlHomePage().route}>
                  <a>Quay về trang chủ</a>
                </Link>
              </p>
            </Container>
          </>
        );
        break;
      case 500:
        response = (
          <>
            {/* <Head>
              <style dangerouslySetInnerHTML={{ __html: Styles }} />
            </Head> */}
            <Container className="pt-5 text-center">
              <h1 className="display-4">Internal Server Error</h1>
              <p>Có lỗi xảy ra.</p>
              <p>
                <Link {...urlHelper.getUrlHomePage().route}>
                  <a>Quay về trang chủ</a>
                </Link>
              </p>
            </Container>
          </>
        );
        break;
      default:
        response = (
          <>
            {/* <Head>
              <style dangerouslySetInnerHTML={{ __html: Styles }} />
            </Head> */}
            <Container className="pt-5 text-center">
              <h1 className="display-4">HTTP {this.props.errorCode} Error</h1>
              <p>
                Lỗi <strong>HTTP {this.props.errorCode}</strong> đã xảy ra khi
                truy cập <strong>{this.props.router.pathname}</strong>
              </p>
              <p>{this.props.message}</p>
              <p>
                <Link {...urlHelper.getUrlHomePage().route}>
                  <a>Quay về trang chủ</a>
                </Link>
              </p>
            </Container>
          </>
        );
    }

    return response;
  }
}

export default withRouter(ErrorPage);

ErrorPage.propTypes = {
  errorCode: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.string
};
ErrorPage.defaultProps = {
  errorCode: {},
  router: false,
  message: ''
};
