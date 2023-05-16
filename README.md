# ttt- Assignment

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment
This section has moved here:https://mellow-gecko-970708.netlify.appp

# Components 

### handleSubmit
this component is used to handle the request made by user when clicked on submit button, when clicked this will fethc the file content from the provided url(https://www.terriblytinytales.com/test.txt) given in the code
after fetching it will parse the data and find the frequency of each word in the given data. It will also slice our data to take only the first 20 most occuring words.

### createChart
This component will map the data from the submit button to the x axis and y axis of the histogram . It will map the data accordingly for the first 20 most occuring words 
and will represnt it in the visual form of histogram visible on the screen.

### handleEXport
This component will handle the request made when clicked on export button on the screen. This will map the histogram data and will create a csv file with the data shoen in the histogram.
user can download this csv file. when clicked on export button a csv file will be downloaded.

# Libraries used
The library used is react-apexcharts for the charts
