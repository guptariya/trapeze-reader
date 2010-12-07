function GlyfSimple() {	this.setData = function(data) {		// read the contour end points		var contourEndPoints = [];		for (var i = 0; i < this.numContours; i++) {			contourEndPoints[i] = data.getShort();		}		this.contourEndPoints = contourEndPoints;		// the number of points in the glyf is the number of the end		// point in the last contour		var numPoints = this.contourEndPoints[this.numContours - 1] + 1;		// read the instructions		var numInstructions = data.getShort();		var instructions = [];		for (var i = 0; i < numInstructions; i++) {			instructions[i] = data.get();		}		this.instructions = instructions;		// read the flags		var flags = [];		for (var i = 0; i < numPoints; i++) {			flags[i] = data.get();						// check for repeats			if ((flags[i] & 0x8) != 0) {				var f = flags[i];				var n = (data.get() & 0xff);				for (var c = 0; c < n; c++) {					flags[++i] =  f;				}			}		}		this.flags = flags;		// read the x coordinates		var xCoords = [];		for (var i = 0; i < numPoints; i++) {			xCoords[i] = 0;		}		for (var i = 0; i < numPoints; i++) {			 if (i > 0) {				 xCoords[i] = xCoords[i - 1];			 }			 // read this value			if (this.xIsByte(i)) {				var val = (data.get() & 0xff);				if (!this.xIsSame(i)) {					// the xIsSame bit controls the sign					val = -val;				}				xCoords[i] += val;			} else if (!this.xIsSame(i)) {				xCoords[i] += data.getShort();			}		}		this.xCoords = xCoords;		// read the y coordinates		var yCoords = [];		for (var i = 0; i < numPoints; i++) {			yCoords[i] = 0;		}		for (var i = 0; i < numPoints; i++) {			if (i > 0) {				yCoords[i] = yCoords[i - 1];			} 			// read this value			if (this.yIsByte(i)) {   				var val = (data.get() & 0xff);				if (!this.yIsSame(i)) {					// the xIsSame bit controls the sign					val = -val;				}				yCoords[i] += val;			} else if (!this.yIsSame(i)) {				yCoords[i] += data.getShort();			}		}		this.yCoords = yCoords;	};	/**     * Determine whether the x value for the given point is byte or short.     * If true, it is a byte, if false it is a short     */     this.xIsByte = function(pointIndex) {        return ((this.flags[pointIndex] & 0x2) != 0);    }	/**     * Determine whether the y value for the given point is byte or short.     * If true, it is a byte, if false it is a short     */     this.yIsByte = function(pointIndex) {        return ((this.flags[pointIndex] & 0x4) != 0);    }	/**     * Determine whether the x value for the given point is the same as      * the previous value.     */     this.xIsSame = function(pointIndex) {        return ((this.flags[pointIndex] & 0x10) != 0);    }	/**     * Determine whether the y value for the given point is the same as      * the previous value.     */     this.yIsSame = function(pointIndex) {        return ((this.flags[pointIndex] & 0x20) != 0);    }	this.getNumPoints = function() {		return this.flags.length;	};	this.getContourEndPoint = function(index) {		return this.contourEndPoints[index];	}	 /**     * Get a given x coordinate     */    this.getXCoord = function(pointIndex) {        return this.xCoords[pointIndex];    }	 /**     * Get a given y coordinate     */    this.getYCoord = function(pointIndex) {        return this.yCoords[pointIndex];    }	/**     * Determine whether the given point is on the curve     */     this.onCurve = function(pointIndex) {        return ((this.flags[pointIndex] & 0x1) != 0);    }}