import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Stack} from '@twilio-paste/core/stack';
import {Paragraph} from '@twilio-paste/core/paragraph';
import {Heading} from '@twilio-paste/core/heading';
import {Card} from '@twilio-paste/core/card';
import {Box} from '@twilio-paste/core/box';
import {Label, Input, HelpText, Column, Grid, Button} from '@twilio-paste/core';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@twilio-paste/core/tabs';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {useUID} from '@twilio-paste/uid-library';
import {Loading} from './components/Loading';

import { ProductEmailAPIIcon } from "@twilio-paste/icons/esm/ProductEmailAPIIcon";
import { ProductVoiceIcon } from "@twilio-paste/icons/esm/ProductVoiceIcon";
import { ProductMessagingIcon } from "@twilio-paste/icons/esm/ProductMessagingIcon";
import { NewIcon } from "@twilio-paste/icons/esm/NewIcon";
import { DownloadIcon } from "@twilio-paste/icons/esm/DownloadIcon";

import QRCode from "react-qr-code";

export const Index: React.FC = () => {
  const [smsQrCodeComponents, setSmsQrCodeComponents] = React.useState({phoneNumber: '', keyword: ''});
  const [smsQrCodeText, setSmsQrCodeText] = React.useState("SMSTO:none:none")
  const [whatsAppQrCodeComponents, setWhatsAppQrCodeComponents] = React.useState({sender: '', message: ''});
  const [whatsAppQrCodeText, setWhatsAppQrCodeText] = React.useState("https://wa.me/<number>?text=<urlencodedtext>");
  const [phoneQrCodeText, setPhoneQrCodeText] = React.useState("tel:+14135555555");
  const [emailQrCodeComponents, setEmailQrCodeComponents] = React.useState({address: '', subject: '', body: ''});
  const [emailQrCodeText, setEmailQrCodeText] = React.useState("mailto:email@example.com?subject=Subject&body=Body");
  const selectedId = useUID();

  const handleSmsToNumberChange = (phoneNumber: string) => {
    smsQrCodeComponents.phoneNumber = phoneNumber;
    const qrText = `SMSTO:${phoneNumber}:${smsQrCodeComponents.keyword}`;
    setSmsQrCodeText(qrText);
    setSmsQrCodeComponents(smsQrCodeComponents);
  }

  const handleSmsKeywordChange = (keyword: string) => {
    smsQrCodeComponents.keyword = keyword;
    const qrText = `SMSTO:${smsQrCodeComponents.phoneNumber}:${keyword}`;
    setSmsQrCodeText(qrText);
    setSmsQrCodeComponents(smsQrCodeComponents);
  }

  const handleQrCodeDownload = (elementId: string) => {
    const svg = document.getElementById(elementId)?.firstChild as HTMLCanvasElement;

    var svgAsXML = (new XMLSerializer).serializeToString(svg);
    const dataString = "data:image/svg+xml," + encodeURIComponent(svgAsXML);
    const link = document.createElement("a");

    link.href = dataString;
    link.download = `${elementId}.svg`;

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
    document.body.removeChild(link);
  }

  const handlePhoneCallChange = (phoneNumber: string) => {
    setPhoneQrCodeText(`tel:${phoneNumber}`);
  }

  const handleWhatsAppToNumberChange = (sender: string) => {
    whatsAppQrCodeComponents.sender = sender;
    const qrText = `https://wa.me/${sender}?text=${encodeURIComponent(whatsAppQrCodeComponents.message)}`;
    setWhatsAppQrCodeText(qrText);
    setWhatsAppQrCodeComponents(whatsAppQrCodeComponents);
  }

  const handleWhatsAppKeywordChange = (message: string) => {
    whatsAppQrCodeComponents.message = message;
    const qrText = `https://wa.me/${whatsAppQrCodeComponents.sender}?text=${encodeURIComponent(message)}`;
    setWhatsAppQrCodeText(qrText);
    setWhatsAppQrCodeComponents(whatsAppQrCodeComponents);
  }

  const handleEmailAddressChange = (address: string) => {
    emailQrCodeComponents.address = address;
    const qrText = `mailto:${emailQrCodeComponents.address}?subject=${emailQrCodeComponents.subject}&body=${emailQrCodeComponents.body}`;

    setEmailQrCodeText(qrText);
    setEmailQrCodeComponents(emailQrCodeComponents);
  }

  const handleEmailSubjectChange = (subject: string) => {
    emailQrCodeComponents.subject = subject;
    const qrText = `mailto:${emailQrCodeComponents.address}?subject=${emailQrCodeComponents.subject}&body=${emailQrCodeComponents.body}`

    setEmailQrCodeText(qrText);
    setEmailQrCodeComponents(emailQrCodeComponents);
  }

  const handleEmailBodyChange = (body: string) => {
    emailQrCodeComponents.body = body;
    const qrText = `mailto:${emailQrCodeComponents.address}?subject=${emailQrCodeComponents.subject}&body=${emailQrCodeComponents.body}`

    setEmailQrCodeText(qrText);
    setEmailQrCodeComponents(emailQrCodeComponents);
  }

  return (
    <App>
      <React.Suspense fallback={<Loading />}>
        <Box padding="space100" maxWidth="1000px" style={{margin: '0 auto'}}>
        <Heading variant="heading10" as="h1">Twilio QR Code Builder</Heading>
        <Tabs orientation="vertical" selectedId={selectedId} baseId="vertical-tabs-example">
            <TabList aria-label="Vertical product tabs">
              <Tab id={selectedId}>SMS QR Code</Tab>
              <Tab>WhatsApp QR Code</Tab>
              <Tab>Phone Call QR Code</Tab>
              <Tab>Email QR Code</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading as="h3" variant="heading30">
                  <Box display="flex" alignItems="center">
                    <ProductMessagingIcon decorative={true} title="Phone icon" />
                    <Box marginLeft="space20">SMS QR Code</Box>
                  </Box>
                </Heading>
                <Stack orientation="vertical" spacing="space60">
                  <Card>
                    <Box marginBottom="space40">
                      <Label htmlFor="to_phone_number" required>To Phone Number</Label>
                      <Input aria-describedby="to_phone_number_help_text" id="to_phone_number" name="to_phone_number" type="text" placeholder="+14135555555" onChange={(event) => handleSmsToNumberChange(event.target.value)} required/>
                      <HelpText id="to_phone_number_help_text">The number that your QR code users will send an SMS to. This can be a 10-digit local number, toll-free number, or short code. See your <a href="https://console.twilio.com/us1/develop/phone-numbers/manage/active?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%3Fx-target-region%3Dus1">available Twilio numbers in the console.</a></HelpText>
                    </Box>
                    <Box>
                      <Label htmlFor="sms_keyword" required>SMS Pre-filled Message</Label>
                      <Input aria-describedby="sms_keyword_help_text" id="sms_keyword" name="sms_keyword" type="text" placeholder="e.g. Home 15, Bus Stop 1207, Volunteer" onChange={(event) => handleSmsKeywordChange(event.target.value)} required/>
                      <HelpText id="sms_keyword_help_text">The prefilled message or keyword that will pre-populate in the user's SMS app.</HelpText>
                    </Box>      
                  </Card>
                  <Card>
                    <Box display="flex">
                      <Grid>
                        <Column>
                          <Box id="sms-qr-code">
                            <QRCode value={smsQrCodeText} />
                          </Box>
                          <Box marginTop="space30">
                            <Button variant="primary" onClick={() => handleQrCodeDownload("sms-qr-code") }><DownloadIcon decorative={false} title="Download icon" /> Download SVG</Button>
                          </Box>
                        </Column>
                        <Column>
                          <Box display="flex" alignItems="center" backgroundColor="colorBackgroundPrimary" color="colorTextBrandInverse" padding="space60">
                            <NewIcon decorative={false} title="Try it out icon" />
                            <Box marginLeft="space20">
                              Try it out! Open your phone's camera app and scan your QR code.
                            </Box>
                          </Box>
                          <svg style={{transform: "rotate(240deg)"}} stroke="rgb(2, 99, 224)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.7" stroke-dashoffset="0" stroke-dasharray="250 250" fill="none" height="176" width="75" viewBox="0 0 85 196" xmlns="http://www.w3.org/2000/svg"><path d="m344.148655 2159.0516-19.1052-24.0516 29.0358 1.512m-12.636 190.8252c69.120001-25.92 101.520001-132.3 0-184.14" transform="matrix(-1 0 0 1 408.043 -2133)"></path></svg>
                        </Column>
                      </Grid>
                    </Box>
                  </Card>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Heading as="h3" variant="heading30">
                  <Box display="flex" alignItems="center">
                    <ProductMessagingIcon decorative={true} title="Whatsapp icon" />
                    <Box marginLeft="space20">WhatsApp QR Code</Box>
                  </Box>
                </Heading>
                <Stack orientation="vertical" spacing="space60">
                  <Card>
                    <Box marginBottom="space40">
                      <Label htmlFor="whatsapp_number" required>To WhatsApp Contact</Label>
                      <Input aria-describedby="whatsapp_number_help_text" id="whatsapp_number" name="whatsapp_number" type="text" placeholder="14135555555" onChange={(event) => handleWhatsAppToNumberChange(event.target.value)} required/>
                      <HelpText id="whatsapp_number_help_text">The WhatsApp sender that your QR code users will send a message to. Use international format with no dashes, parentheses, spaces, etc. See your <a href="https://console.twilio.com/us1/develop/sms/senders/whatsapp-senders?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Fsenders%3Fx-target-region%3Dus1">available Twilio WhatsApp senders in the console.</a></HelpText>
                    </Box>
                    <Box>
                      <Label htmlFor="sms_keyword" required>Whatsapp Prefilled Message</Label>
                      <Input aria-describedby="sms_keyword_help_text" id="sms_keyword" name="sms_keyword" type="text" placeholder="e.g. Home 15, Bus Stop 1207, Volunteer" onChange={(event) => handleWhatsAppKeywordChange(event.target.value)} required/>
                      <HelpText id="sms_keyword_help_text">The prefilled message or keyword that will pre-populate in WhatsApp.</HelpText>
                    </Box>      
                  </Card>
                  
                  <Card>
                    <Box display="flex">
                      <Grid>
                        <Column>
                          <Box id="whatsapp-qr-code">
                            <QRCode value={whatsAppQrCodeText} />
                          </Box>
                          <Box marginTop="space30">
                            <Button variant="primary" onClick={() => handleQrCodeDownload("whatsapp-qr-code") }><DownloadIcon decorative={false} title="Download icon" /> Download SVG</Button>
                          </Box>
                        </Column>
                        <Column>
                          <Box display="flex" alignItems="center" backgroundColor="colorBackgroundPrimary" color="colorTextBrandInverse" padding="space60">
                            <NewIcon decorative={false} title="Try it out icon" />
                            <Box marginLeft="space20">
                              Try it out! Open your phone's camera app and scan your QR code.
                            </Box>
                          </Box>
                          <svg style={{transform: "rotate(240deg)"}} stroke="rgb(2, 99, 224)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.7" stroke-dashoffset="0" stroke-dasharray="250 250" fill="none" height="176" width="75" viewBox="0 0 85 196" xmlns="http://www.w3.org/2000/svg"><path d="m344.148655 2159.0516-19.1052-24.0516 29.0358 1.512m-12.636 190.8252c69.120001-25.92 101.520001-132.3 0-184.14" transform="matrix(-1 0 0 1 408.043 -2133)"></path></svg>
                        </Column>
                      </Grid>
                    </Box>
                  </Card>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Heading as="h3" variant="heading30">
                  <Box display="flex" alignItems="center">
                    <ProductVoiceIcon decorative={true} title="Phone icon" />
                    <Box marginLeft="space20">Phone Call QR Code</Box>
                  </Box>
                </Heading>
                <Stack orientation="vertical" spacing="space60">
                  <Card>
                    <Box>
                      <Label htmlFor="voice_phone_nubmber" required>To Phone Number</Label>
                      <Input aria-describedby="voice_phone_nubmber_help_text" id="voice_phone_nubmber" name="voice_phone_nubmber" type="text" placeholder="+14135555555" onChange={(event) => handlePhoneCallChange(event.target.value)} required/>
                      <HelpText id="voice_phone_nubmber_help_text">The number that will be called when the QR code is scanned. See your <a href="https://console.twilio.com/us1/develop/phone-numbers/manage/active?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%3Fx-target-region%3Dus1">available Twilio numbers in the console.</a></HelpText>
                    </Box>      
                  </Card>
                  <Card>
                    <Box display="flex">
                      <Grid>
                        <Column>
                          <Box id="phone-qr-code">
                            <QRCode value={phoneQrCodeText} />
                          </Box>
                          <Box marginTop="space30">
                            <Button variant="primary" onClick={() => handleQrCodeDownload("phone-qr-code") }><DownloadIcon decorative={false} title="Download icon" /> Download SVG</Button>
                          </Box>
                        </Column>
                        <Column>
                          <Box display="flex" alignItems="center" backgroundColor="colorBackgroundPrimary" color="colorTextBrandInverse" padding="space60">
                            <NewIcon decorative={false} title="Try it out icon" />
                            <Box marginLeft="space20">
                              Try it out! Open your phone's camera app and scan your QR code.
                            </Box>
                          </Box>
                          <svg style={{transform: "rotate(240deg)"}} stroke="rgb(2, 99, 224)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.7" stroke-dashoffset="0" stroke-dasharray="250 250" fill="none" height="176" width="75" viewBox="0 0 85 196" xmlns="http://www.w3.org/2000/svg"><path d="m344.148655 2159.0516-19.1052-24.0516 29.0358 1.512m-12.636 190.8252c69.120001-25.92 101.520001-132.3 0-184.14" transform="matrix(-1 0 0 1 408.043 -2133)"></path></svg>
                        </Column>
                      </Grid>
                    </Box>
                  </Card>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Heading as="h3" variant="heading30">
                  <Box display="flex" alignItems="center">
                    <ProductEmailAPIIcon decorative={true} title="Email icon" />
                    <Box marginLeft="space20">Email QR Code</Box>
                  </Box>
                </Heading>
                <Stack orientation="vertical" spacing="space60">
                  <Card>
                    <Box marginBottom="space40">
                      <Label htmlFor="email_address" required>Email Address</Label>
                      <Input aria-describedby="email_address_help_text" id="email_address" name="email_address" type="text" placeholder="customer-care@mysite.com" onChange={(e) => handleEmailAddressChange(e.target.value)} required/>
                      <HelpText id="email_address_help_text">The email address that the QR code should send a message to.</HelpText>
                    </Box>
                    <Box marginBottom="space40">
                      <Label htmlFor="email_subject" required>Email Subject</Label>
                      <Input aria-describedby="email_subject_help_text" id="email_subject" name="email_subject" type="text" placeholder="e.g. Feedback from store #3002" onChange={(e) => handleEmailSubjectChange(e.target.value)} required/>
                      <HelpText id="email_subject_help_text">The keyword that will pre-populate in the user's SMS app.</HelpText>
                    </Box>
                    <Box>
                      <Label htmlFor="email_body" required>Email Body</Label>
                      <Input aria-describedby="email_body_help_text" id="email_body" name="email_body" type="text" placeholder="e.g. [your message here]" onChange={(e) => handleEmailBodyChange(e.target.value)} required/>
                      <HelpText id="email_body_help_text">The pre-populated email body message that you would like to send.</HelpText>
                    </Box>      
                  </Card>
                  <Card>
                    <Box display="flex">
                      <Grid>
                        <Column>
                          <Box id="email-qr-code">
                            <QRCode value={emailQrCodeText} />
                          </Box>
                          <Box marginTop="space30">
                            <Button variant="primary" onClick={() => handleQrCodeDownload("email-qr-code") }><DownloadIcon decorative={false} title="Download icon" /> Download SVG</Button>
                          </Box>
                        </Column>
                        <Column>
                          <Box display="flex" alignItems="center" backgroundColor="colorBackgroundPrimary" color="colorTextBrandInverse" padding="space60">
                            <NewIcon decorative={false} title="Try it out icon" />
                            <Box marginLeft="space20">
                              Try it out! Open your phone's camera app and scan your QR code.
                            </Box>
                          </Box>
                          <svg style={{transform: "rotate(240deg)"}} stroke="rgb(2, 99, 224)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.7" stroke-dashoffset="0" stroke-dasharray="250 250" fill="none" height="176" width="75" viewBox="0 0 85 196" xmlns="http://www.w3.org/2000/svg"><path d="m344.148655 2159.0516-19.1052-24.0516 29.0358 1.512m-12.636 190.8252c69.120001-25.92 101.520001-132.3 0-184.14" transform="matrix(-1 0 0 1 408.043 -2133)"></path></svg>
                        </Column>
                      </Grid>
                    </Box>
                  </Card>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </React.Suspense>
    </App>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.querySelector('#root')
);

/**
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
// eslint-disable-next-line no-console
reportWebVitals(console.log);
