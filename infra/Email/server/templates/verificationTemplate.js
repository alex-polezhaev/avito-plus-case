const verificationTemplate = (verificationLink) => {
  const verificationHTML = `<!DOCTYPE html>
  <html lang="ru" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="Margin: 0; padding: 0; box-sizing: border-box;">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
      <!--[if (gte mso 9)|(IE)]>
      <style type=text/css>
      table {mso-table-lspace: 0pt;mso-table-rspace: 0pt; border-collapse:collapse;}
      G {border: 0;display: block;}
      #outlook a{text-decoration: none !important; }
      </style>
      <![endif]
      -->
      <style type="text/css">
        @media only screen and (max-width: 600px){
          .tabCon{
            width: 100% !important;
            min-width: 220px !important;
            margin: 0 !important;
            float: none !important;}
            .mwa{max-width: 440px !important;}
          .logo{width: 190px !important; }
          .photo, .photo img{width: 100px !important;}
          .t11{font-size:38px !important; line-height:50px !important;}
          .wr1{background-size: 160px auto  !important; padding-bottom: 120px !important;}
  
        }
      </style>
    </head>
    <body style="-webkit-font-smoothing: antialiased; font-family: 'Roboto', 'Arial', sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 19px; min-width: 320px; color: #0F0F0F; -webkit-text-size-adjust: none; Margin: 0; padding: 0; box-sizing: border-box;">
      <div style="Margin: 0; padding: 0; box-sizing: border-box; background: #E4E4E4; width: 100%;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="ltr" bgcolor="#E4E4E4" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse;">
          <tbody>
            <tr>
              <td align="center" style="Margin: 0; padding: 0; box-sizing: border-box; min-width: 320px;">
                <table class="tabCon" align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 680px; background-color: #ffffff;" bgcolor="#ffffff">
                  <tbody>
                    <tr>
                      <td align="center" style="Margin: 0; box-sizing: border-box; padding: 37px 12px 51px 10px;">
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 594px;">
                          <tbody>
                            <tr>
                              <td align="left" style="Margin: 0; padding: 0; box-sizing: border-box; border-bottom: 1px dashed #000000; padding-bottom: 38px;"><img class="logo" src="${process.env.FRONTEND_DOMAIN}/avitoplus.png" alt="Avito Plus" width="247" border="0" height="auto" style="border: 0; display: block;">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="Margin: 0; box-sizing: border-box; padding: 0px 12px 0px 10px;">
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 594px;">
                          <tbody>
                            <tr>
                              <td align="left" style="Margin: 0; padding: 0; box-sizing: border-box;">
                                <p class="t11" style="Margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', 'Arial', sans-serif; text-align: left; mso-line-height-rule: exactly; color: #1c1c1c; font-size: 54px; font-weight: 900; line-height: 72px;">Confirmation </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="plr" align="right" style="Margin: 0; padding: 0; box-sizing: border-box; font-size: 1px;" valign="top"><!--[if (gte mso 9)|(IE)]><table  border="0" cellspacing="0" cellpadding="0"><tr><td align="left" width="390" valign="top"><![endif]-->
                        <div style="Margin: 0; padding: 0; box-sizing: border-box; display: inline-block; vertical-align: top;">
                          <table class="tabCon mwa" align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 392px;">
                            <tbody>
                              <tr>
                                <td style="Margin: 0; box-sizing: border-box; padding: 0 10px;" align="left"> 
                                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 372px;" class="mwa">
                                    <tbody>
                                      <tr>
                                        <td align="left" style="Margin: 0; padding: 0; box-sizing: border-box; padding-bottom: 20px;">
                                          <p class="t11" style="Margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', 'Arial', sans-serif; text-align: left; mso-line-height-rule: exactly; color: #1c1c1c; font-size: 54px; font-weight: 900; line-height: 72px;">
                                             E-mail</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="left" style="Margin: 0; padding: 0; box-sizing: border-box;">
                                          <p style="Margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', 'Arial', sans-serif; text-align: left; mso-line-height-rule: exactly; color: #404040; font-size: 14px; font-weight: 400; line-height: 28px; letter-spacing: 0.25px;">Click the confirm registration button to register an account on the service <a href="${process.env.FRONTEND_DOMAIN}" style="Margin: 0; padding: 0; box-sizing: border-box; cursor: pointer; text-decoration: none; color: #404040;" target="_blank">your-domain.example</a></p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div><!--[if (gte mso 9)|(IE)]></td><td align="right"  valign="top"><![endif]-->
                        <div style="Margin: 0; padding: 0; box-sizing: border-box; display: inline-block; vertical-align: top; width: 256px;">
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="256" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse;">
                            <tbody>
                              <tr>
                                <td align="center" style="Margin: 0; padding: 0; box-sizing: border-box;"> <img src="${process.env.FRONTEND_DOMAIN}/image.png" alt="image" width="256" border="0" height="auto" style="border: 0; display: block;">
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="Margin: 0; box-sizing: border-box; padding: 3px 12px 50px 10px;">
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="Margin: 0; padding: 0; box-sizing: border-box; border-spacing: 0; border-collapse: collapse; max-width: 594px;">
                          <tbody>
                            <tr>
                              <td align="center" style="Margin: 0; padding: 0; box-sizing: border-box; padding-bottom: 46px; border-bottom: 1px dashed #000000;"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:36pt;v-text-anchor:middle;width:446pt;" arcsize="23%" stroke="f" fillcolor="#A461CD"><w:anchorlock/><center><![endif]--><a href="${verificationLink}" style="Margin: 0; padding: 0; box-sizing: border-box; cursor: pointer; background-color: #A461CD; border-radius: 11px; color: #ffffff; display: inline-block; font-family: 'Roboto','Arial', sans-serif; font-size: 16px; font-weight: bold; line-height: 48px; text-align: center; text-decoration: none; width: 100%; max-width: 594px; -webkit-text-size-adjust: none;">Confirm registration</a><!--[if mso]></center></v:roundrect><![endif]--></td>
                            </tr>
                            <tr>
                              <td align="left" style="Margin: 0; padding: 0; box-sizing: border-box; padding-top: 32px;">
                                <p style="Margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', 'Arial', sans-serif; text-align: left; mso-line-height-rule: exactly; color: #404040; font-size: 14px; font-weight: 400; line-height: 28px; letter-spacing: 0.25px;">If you did not sign up for the service, simply ignore this email.</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>`;

  return verificationHTML;
};

export default verificationTemplate;
