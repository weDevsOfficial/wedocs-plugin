function extractedTitle( title, length = 60 ) {
  const extractedString = title?.substr( 0, length );
  return extractedString?.length >= length
    ? `${ extractedString }...`
    : extractedString;
}

export default extractedTitle;
