@Grab('com.xlson.groovycsv:groovycsv:1.0')
import com.xlson.groovycsv.CsvParser

def csvFile = "scopus.csv"

// To avoid spaces in column names 
def columns = ["Authors", "Title", "Year", "SourceTitle", "Volume", "Issue", "ArticleNumber", "PageStart", "PageEnd", "PageCount", "Link"
]

def reader = new FileReader(csvFile)
def data = new CsvParser().parse(reader, columnNames:columns)

// Produce an HTML table 
println "<table>"
println "  <tr>"
println "    <th class='author'>Authors</th>"
println "    <th class='title'>Title</th>"
println "    <th class='journal'>Journal</th>"
println "    <th class='year'>Year</th>"
println "  </tr>"

for(line in data) {
	println "  <tr>" 

	// Account for one or many authors
	def tmp = line.Authors.split(',')
	if(tmp.size() > 1) {
		println "    <td class='author'>${tmp[0]}, et al.</td>"
	} else {
		println "    <td class='author'>${tmp[0]}</td>"
	}	

	//DEBUG
	//println "    <td class='author'>$line.Authors</td>"

    // Clean the titles of any characters causing errors in the links
    def cleanTitle = line.Title.replaceAll("'", "")

	println "    <td class='title'><a href='http://www.ncbi.nlm.nih.gov/pubmed/?term=$cleanTitle'>$line.Title</a></td>"
	println "    <td class='journal'>$line.SourceTitle</td>"
	println "    <td class='year'>$line.Year</td>"
	println "  </tr>" 
}

println "</table>"

