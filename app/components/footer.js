import React from 'react'
var logo = require("../img/title_small_white.png")

const FooterComponent = () => {

  return (
      <div id="footer">
        <div className="footer">
          <div className="about">About <img src={logo}/></div>
          <div className="descr">
            SweetSuite is an easy and simple way to search for apartments using modern functionality to increase efficiency and lessen the stress that often comes to potential tenants that are seeking out a place of residence.
          </div>
        </div>
      </div>
  )
}

export default FooterComponent
