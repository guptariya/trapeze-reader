function PDResources(resourceDictionary) {	this.resources = resourceDictionary;		 /**     * This will get the map of fonts.  This will never return null.  The keys are string     * and the values are PDFont objects.     *     * @param fontCache A map of existing PDFont objects to reuse.     * @return The map of fonts.     *     * @throws IOException If there is an error getting the fonts.     */    this.getFonts = function()    {        var retval = null;        var fonts = this.resources.getDictionaryObject( 'Font' );		console.log(fonts);        /*		//TODO		if( fonts == null )        {            fonts = new COSDictionary();            resources.setItem( 'Font', fonts );        } */        //Map actuals = new HashMap();        retval = {};				/*        Iterator fontNames = fonts.keyList().iterator();        while( fontNames.hasNext() )        {            COSName fontName = (COSName)fontNames.next();            COSBase font = fonts.getDictionaryObject( fontName );            //data-000174.pdf contains a font that is a COSArray, looks to be an error in the            //PDF, we will just ignore entries that are not dictionaries.            if( font instanceof COSDictionary )            {                COSDictionary fontDictionary = (COSDictionary)font;                actuals.put( fontName.getName(), PDFontFactory.createFont( fontDictionary, fontCache ));            }        }*/        return retval;    }	this.getFont = function(name)	{ 		/*if(name == "F73") {			debugger;		}*/		var fonts = this.resources.getDictionaryObject( 'Font' );		var font = fonts.getDictionaryObject(name);		return font;	}	this.getXObject = function(name) {		var x = this.resources.getDictionaryObject('XObject');		return x.getDictionaryObject(name);	};	/**     * This will get the map of graphic states.  This will return null if the underlying     * resources dictionary does not have a graphics dictionary.  The keys are the graphic state     * name as a String and the values are PDExtendedGraphicsState objects.     *     * @return The map of extended graphic state objects.     */	this.getGraphicsState = function(name)    {        var states = this.resources.getDictionaryObject("ExtGState");		if(states == null)			return null;		return states.getDictionaryObject(name);    }}