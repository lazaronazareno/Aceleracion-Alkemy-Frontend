import S3 from 'react-aws-s3'

const accessKeyId =  process.env.REACT_APP_AWS_S3_KEY
const secretAccessKey = process.env.REACT_APP_AWS_S3_SECRET
const s3Url = process.env.REACT_APP_AWS_S3_URL
const region = process.env.REACT_APP_AWS_S3_REGION
const bucketName = process.env.REACT_APP_AWS_S3_BUCKET
const dirName = process.env.REACT_APP_AWS_S3_DIRNAME

// FYI: Notice that if you don't provide a dirName, 
// the file will be automatically uploaded to the root of your bucket

const config = {
	bucketName,
	dirName,
	region,
	accessKeyId,
	secretAccessKey,
	s3Url
}

const ReactS3Client = new S3(config)

export const uploadFile = (file, newFileName) => ReactS3Client
	.uploadFile(file, newFileName)
	.then(data => ({
		status: true,
		data
	}))
	.catch(err => ({
		status: false,
		err
	}))


// FYI: this is the response you will get from S3 after upload a file
// {
//   Response: {
//     bucket: "myBucket",
//     key: "image/test-image.jpg",
//     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
//   }
// }