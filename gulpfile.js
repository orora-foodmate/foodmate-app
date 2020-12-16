const gulp = require("gulp");
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const {
	FIREBASE_CLIENT_ID,
	FIREBASE_REVERSED_CLIENT_ID,
	FIREBASE_API_KEY,
	FIREBASE_GCM_SENDER_ID,
	FIREBASE_BUNDLE_ID,
	FIREBASE_PROJECT_ID,
	FIREBASE_GOOGLE_APP_ID,
	FIREBASE_DATABASE_URL
} = process.env;

gulp.task("default", async (done) => {
  try {
		fs.writeFileSync('./ios/foodmate/GoogleService-Info.plist',
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CLIENT_ID</key>
	<string>${FIREBASE_CLIENT_ID}</string>
	<key>REVERSED_CLIENT_ID</key>
	<string>${FIREBASE_REVERSED_CLIENT_ID}</string>
	<key>API_KEY</key>
	<string>${FIREBASE_API_KEY}</string>
	<key>GCM_SENDER_ID</key>
	<string>${FIREBASE_GCM_SENDER_ID}</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>${FIREBASE_BUNDLE_ID}</string>
	<key>PROJECT_ID</key>
	<string>${FIREBASE_PROJECT_ID}</string>
	<key>STORAGE_BUCKET</key>
	<string>${FIREBASE_PROJECT_ID}.appspot.com</string>
	<key>IS_ADS_ENABLED</key>
	<false></false>
	<key>IS_ANALYTICS_ENABLED</key>
	<false></false>
	<key>IS_APPINVITE_ENABLED</key>
	<true></true>
	<key>IS_GCM_ENABLED</key>
	<true></true>
	<key>IS_SIGNIN_ENABLED</key>
	<true></true>
	<key>GOOGLE_APP_ID</key>
	<string>${FIREBASE_GOOGLE_APP_ID}</string>
	<key>DATABASE_URL</key>
	<string>${FIREBASE_DATABASE_URL}</string>
</dict>
</plist>
    `);
    done();
  } catch (error) {
    done();
  }
});
