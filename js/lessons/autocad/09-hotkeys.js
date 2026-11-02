/* Lesson 9 — Hot keys A–Z (Autodesk AutoCAD Shortcuts Guide pp.4–10)
   Generated list: 226 command aliases. */
KCE_COURSE.lessons.push({
  id: 'hotkeys',
  num: 9,
  title: 'Hot Keys A–Z Reference',
  desc: 'All 226 command aliases from the Autodesk shortcuts guide, with a search box to find any command fast.',
  icon: '🔎',
  color: 'rose',
  meta: ['Shortcuts Guide pp.4–10', 'Reference', '226 aliases'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Every AutoCAD command can be typed in full, but most have a short <strong>alias</strong> of one to five letters. This lesson is a complete reference of the 226 aliases in the Autodesk AutoCAD Shortcuts Guide, grouped by first letter.</p>` },
        { title: 'Description', html: String.raw`
<p>Type an alias on the command line and press <kbd>Space</kbd> or <kbd>Enter</kbd>. Aliases are defined in the <code>acad.pgp</code> file; you can edit it (Manage › Customization › Edit Aliases) and reload it with <code>REINIT</code>.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Type part of a command or alias in the search box — the tables below filter as you type.</li>
  <li>Learn the aliases for the commands you use every day; look up the rest here.</li>
  <li>If you use a command often and it has no short alias, add your own to <code>acad.pgp</code>.</li>
</ol>` },
        { title: 'Search', html: String.raw`
<div data-widget="filter-table" data-target="table.hotkeys" data-placeholder="Search aliases, e.g. dim, hatch, LA, 3D…"></div>` }
      ]
    },
    {
      title: 'Hot Keys A–Z',
      subs: [
        { title: 'A – C', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>A</kbd></td><td><strong>ARC</strong></td><td>Creates an arc.</td></tr>
    <tr><td><kbd>AA</kbd></td><td><strong>AREA</strong></td><td>Calculates the area and perimeter of objects or of defined areas.</td></tr>
    <tr><td><kbd>ADC</kbd></td><td><strong>ADCENTER</strong></td><td>Manages and inserts content such as blocks, xrefs and hatch patterns.</td></tr>
    <tr><td><kbd>AL</kbd></td><td><strong>ALIGN</strong></td><td>Aligns objects with other objects in 2D and 3D.</td></tr>
    <tr><td><kbd>AP</kbd></td><td><strong>APPLOAD</strong></td><td>Loads applications.</td></tr>
    <tr><td><kbd>AR</kbd></td><td><strong>ARRAY</strong></td><td>Creates multiple copies of objects in a pattern.</td></tr>
    <tr><td><kbd>ARR</kbd></td><td><strong>ACTRECORD</strong></td><td>Starts the Action Recorder.</td></tr>
    <tr><td><kbd>ARM</kbd></td><td><strong>ACTUSERMESSAGE</strong></td><td>Inserts a user message into an action macro.</td></tr>
    <tr><td><kbd>ARU</kbd></td><td><strong>ACTUSERINPUT</strong></td><td>Pauses for user input in an action macro.</td></tr>
    <tr><td><kbd>ARS</kbd></td><td><strong>ACTSTOP</strong></td><td>Stops the Action Recorder and offers to save the recorded actions to an action macro file.</td></tr>
    <tr><td><kbd>ATI</kbd></td><td><strong>ATTIPEDIT</strong></td><td>Changes the textual content of an attribute within a block.</td></tr>
    <tr><td><kbd>ATT</kbd></td><td><strong>ATTDEF</strong></td><td>Redefines a block and updates associated attributes.</td></tr>
    <tr><td><kbd>ATE</kbd></td><td><strong>ATTEDIT</strong></td><td>Changes attribute information in a block.</td></tr>
    <tr><td><kbd>B</kbd></td><td><strong>BLOCK</strong></td><td>Creates a block definition from selected objects.</td></tr>
    <tr><td><kbd>BC</kbd></td><td><strong>BCLOSE</strong></td><td>Closes the Block Editor.</td></tr>
    <tr><td><kbd>BE</kbd></td><td><strong>BEDIT</strong></td><td>Opens the block definition in the Block Editor.</td></tr>
    <tr><td><kbd>BH</kbd></td><td><strong>HATCH</strong></td><td>Fills an enclosed area or selected objects with a hatch pattern, solid fill or gradient fill.</td></tr>
    <tr><td><kbd>BO</kbd></td><td><strong>BOUNDARY</strong></td><td>Creates a region or a polyline from an enclosed area.</td></tr>
    <tr><td><kbd>BR</kbd></td><td><strong>BREAK</strong></td><td>Breaks the selected object between two points.</td></tr>
    <tr><td><kbd>BS</kbd></td><td><strong>BSAVE</strong></td><td>Saves the current block definition.</td></tr>
    <tr><td><kbd>BVS</kbd></td><td><strong>BVSTATE</strong></td><td>Creates, sets or deletes a visibility state in a dynamic block.</td></tr>
    <tr><td><kbd>C</kbd></td><td><strong>CIRCLE</strong></td><td>Creates a circle.</td></tr>
    <tr><td><kbd>CAM</kbd></td><td><strong>CAMERA</strong></td><td>Sets a camera and target location to create and save a 3D perspective view of objects.</td></tr>
    <tr><td><kbd>CBAR</kbd></td><td><strong>CONSTRAINTBAR</strong></td><td>A toolbar-like element that displays the geometric constraints on an object.</td></tr>
    <tr><td><kbd>CH</kbd></td><td><strong>PROPERTIES</strong></td><td>Controls properties of existing objects.</td></tr>
    <tr><td><kbd>CHA</kbd></td><td><strong>CHAMFER</strong></td><td>Bevels the edges of objects.</td></tr>
    <tr><td><kbd>CHK</kbd></td><td><strong>CHECKSTANDARDS</strong></td><td>Checks the current drawing for standards violations.</td></tr>
    <tr><td><kbd>CLI</kbd></td><td><strong>COMMANDLINE</strong></td><td>Displays the command line window.</td></tr>
    <tr><td><kbd>COL</kbd></td><td><strong>COLOR</strong></td><td>Sets the colour for new objects.</td></tr>
    <tr><td><kbd>CO</kbd></td><td><strong>COPY</strong></td><td>Copies objects a specified distance in a specified direction.</td></tr>
    <tr><td><kbd>CT</kbd></td><td><strong>CTABLESTYLE</strong></td><td>Sets the name of the current table style.</td></tr>
    <tr><td><kbd>CUBE</kbd></td><td><strong>NAVVCUBE</strong></td><td>Controls the visibility and display properties of the ViewCube.</td></tr>
    <tr><td><kbd>CYL</kbd></td><td><strong>CYLINDER</strong></td><td>Creates a 3D solid cylinder.</td></tr>
  </tbody>
</table></div>` },
        { title: 'D', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>D</kbd></td><td><strong>DIMSTYLE</strong></td><td>Creates and modifies dimension styles.</td></tr>
    <tr><td><kbd>DAN</kbd></td><td><strong>DIMANGULAR</strong></td><td>Creates an angular dimension.</td></tr>
    <tr><td><kbd>DAR</kbd></td><td><strong>DIMARC</strong></td><td>Creates an arc length dimension.</td></tr>
    <tr><td><kbd>DBA</kbd></td><td><strong>DIMBASELINE</strong></td><td>Creates a linear, angular or ordinate dimension from the baseline of the previous or selected dimension.</td></tr>
    <tr><td><kbd>DBC</kbd></td><td><strong>DBCONNECT</strong></td><td>Provides an interface to external database tables.</td></tr>
    <tr><td><kbd>DCE</kbd></td><td><strong>DIMCENTER</strong></td><td>Creates the center mark or the centerlines of circles and arcs.</td></tr>
    <tr><td><kbd>DCO</kbd></td><td><strong>DIMCONTINUE</strong></td><td>Creates a dimension that starts from an extension line of a previously created dimension.</td></tr>
    <tr><td><kbd>DCON</kbd></td><td><strong>DIMCONSTRAINT</strong></td><td>Applies dimensional constraints to selected objects or points on objects.</td></tr>
    <tr><td><kbd>DDA</kbd></td><td><strong>DIMDISASSOCIATE</strong></td><td>Removes associativity from selected dimensions.</td></tr>
    <tr><td><kbd>DDI</kbd></td><td><strong>DIMDIAMETER</strong></td><td>Creates a diameter dimension for a circle or an arc.</td></tr>
    <tr><td><kbd>DED</kbd></td><td><strong>DIMEDIT</strong></td><td>Edits dimension text and extension lines.</td></tr>
    <tr><td><kbd>DI</kbd></td><td><strong>DIST</strong></td><td>Measures the distance and angle between two points.</td></tr>
    <tr><td><kbd>DIV</kbd></td><td><strong>DIVIDE</strong></td><td>Creates evenly spaced point objects or blocks along the length or perimeter of an object.</td></tr>
    <tr><td><kbd>DJL</kbd></td><td><strong>DIMJOGLINE</strong></td><td>Adds or removes a jog line on a linear or aligned dimension.</td></tr>
    <tr><td><kbd>DJO</kbd></td><td><strong>DIMJOGGED</strong></td><td>Creates jogged dimensions for circles and arcs.</td></tr>
    <tr><td><kbd>DL</kbd></td><td><strong>DATALINK</strong></td><td>Displays the Data Link dialog box.</td></tr>
    <tr><td><kbd>DLU</kbd></td><td><strong>DATALINKUPDATE</strong></td><td>Updates data to or from an established external data link.</td></tr>
    <tr><td><kbd>DO</kbd></td><td><strong>DONUT</strong></td><td>Creates a filled circle or a wide ring.</td></tr>
    <tr><td><kbd>DOR</kbd></td><td><strong>DIMORDINATE</strong></td><td>Creates ordinate dimensions.</td></tr>
    <tr><td><kbd>DOV</kbd></td><td><strong>DIMOVERRIDE</strong></td><td>Controls overrides of system variables used in selected dimensions.</td></tr>
    <tr><td><kbd>DR</kbd></td><td><strong>DRAWORDER</strong></td><td>Changes the draw order of images and other objects.</td></tr>
    <tr><td><kbd>DRA</kbd></td><td><strong>DIMRADIUS</strong></td><td>Creates a radius dimension for a circle or an arc.</td></tr>
    <tr><td><kbd>DRE</kbd></td><td><strong>DIMREASSOCIATE</strong></td><td>Associates or re-associates selected dimensions to objects or points on objects.</td></tr>
    <tr><td><kbd>DRM</kbd></td><td><strong>DRAWINGRECOVERY</strong></td><td>Displays a list of drawing files that can be recovered after a program or system failure.</td></tr>
    <tr><td><kbd>DS</kbd></td><td><strong>DSETTINGS</strong></td><td>Sets grid and snap, polar and object snap tracking, object snap modes, Dynamic Input and Quick Properties.</td></tr>
    <tr><td><kbd>DT</kbd></td><td><strong>TEXT</strong></td><td>Creates a single-line text object.</td></tr>
    <tr><td><kbd>DV</kbd></td><td><strong>DVIEW</strong></td><td>Defines parallel projection or perspective views by using a camera and target.</td></tr>
    <tr><td><kbd>DX</kbd></td><td><strong>DATAEXTRACTION</strong></td><td>Extracts drawing data and merges data from an external source to a data extraction table or external file.</td></tr>
  </tbody>
</table></div>` },
        { title: 'E – H', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>E</kbd></td><td><strong>ERASE</strong></td><td>Removes objects from a drawing.</td></tr>
    <tr><td><kbd>ED</kbd></td><td><strong>DDEDIT</strong></td><td>Edits single-line text, dimension text, attribute definitions and feature control frames.</td></tr>
    <tr><td><kbd>EL</kbd></td><td><strong>ELLIPSE</strong></td><td>Creates an ellipse or an elliptical arc.</td></tr>
    <tr><td><kbd>EPDF</kbd></td><td><strong>EXPORTPDF</strong></td><td>Exports the drawing to PDF.</td></tr>
    <tr><td><kbd>ER</kbd></td><td><strong>EXTERNALREFERENCES</strong></td><td>Opens the External References palette.</td></tr>
    <tr><td><kbd>EX</kbd></td><td><strong>EXTEND</strong></td><td>Extends objects to meet the edges of other objects.</td></tr>
    <tr><td><kbd>EXIT</kbd></td><td><strong>QUIT</strong></td><td>Exits the program.</td></tr>
    <tr><td><kbd>EXP</kbd></td><td><strong>EXPORT</strong></td><td>Saves the objects in a drawing to a different file format.</td></tr>
    <tr><td><kbd>EXT</kbd></td><td><strong>EXTRUDE</strong></td><td>Extends the dimensions of a 2D object or 3D face into 3D space.</td></tr>
    <tr><td><kbd>F</kbd></td><td><strong>FILLET</strong></td><td>Rounds and fillets the edges of objects.</td></tr>
    <tr><td><kbd>FI</kbd></td><td><strong>FILTER</strong></td><td>Creates a list of requirements that an object must meet to be included in a selection set.</td></tr>
    <tr><td><kbd>FS</kbd></td><td><strong>FSMODE</strong></td><td>Creates a selection set of all objects that touch the selected object.</td></tr>
    <tr><td><kbd>FSHOT</kbd></td><td><strong>FLATSHOT</strong></td><td>Creates a 2D representation of all 3D objects based on the current view.</td></tr>
    <tr><td><kbd>G</kbd></td><td><strong>GROUP</strong></td><td>Creates and manages saved sets of objects called groups.</td></tr>
    <tr><td><kbd>GCON</kbd></td><td><strong>GEOCONSTRAINT</strong></td><td>Applies or persists geometric relationships between objects or points on objects.</td></tr>
    <tr><td><kbd>GD</kbd></td><td><strong>GRADIENT</strong></td><td>Fills an enclosed area or selected objects with a gradient fill.</td></tr>
    <tr><td><kbd>GEO</kbd></td><td><strong>GEOGRAPHICLOCATION</strong></td><td>Specifies the geographic location information for a drawing file.</td></tr>
    <tr><td><kbd>H</kbd></td><td><strong>HATCH</strong></td><td>Fills an enclosed area or selected objects with a hatch pattern, solid fill or gradient fill.</td></tr>
    <tr><td><kbd>HE</kbd></td><td><strong>HATCHEDIT</strong></td><td>Modifies an existing hatch or fill.</td></tr>
    <tr><td><kbd>HI</kbd></td><td><strong>HIDE</strong></td><td>Regenerates a 3D wireframe model with hidden lines suppressed.</td></tr>
  </tbody>
</table></div>` },
        { title: 'I – O', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>I</kbd></td><td><strong>INSERT</strong></td><td>Inserts a block or drawing into the current drawing.</td></tr>
    <tr><td><kbd>IAD</kbd></td><td><strong>IMAGEADJUST</strong></td><td>Controls the brightness, contrast and fade values of images.</td></tr>
    <tr><td><kbd>IAT</kbd></td><td><strong>IMAGEATTACH</strong></td><td>Inserts a reference to an image file.</td></tr>
    <tr><td><kbd>ICL</kbd></td><td><strong>IMAGECLIP</strong></td><td>Crops the display of a selected image to a specified boundary.</td></tr>
    <tr><td><kbd>ID</kbd></td><td><strong>ID</strong></td><td>Displays the UCS coordinate values of a specified location.</td></tr>
    <tr><td><kbd>IM</kbd></td><td><strong>IMAGE</strong></td><td>Displays the External References palette.</td></tr>
    <tr><td><kbd>IMP</kbd></td><td><strong>IMPORT</strong></td><td>Imports files of different formats into the current drawing.</td></tr>
    <tr><td><kbd>IN</kbd></td><td><strong>INTERSECT</strong></td><td>Creates a 3D solid, surface or 2D region from overlapping solids, surfaces or regions.</td></tr>
    <tr><td><kbd>INF</kbd></td><td><strong>INTERFERE</strong></td><td>Creates a temporary 3D solid from the interferences between two sets of selected 3D solids.</td></tr>
    <tr><td><kbd>IO</kbd></td><td><strong>INSERTOBJ</strong></td><td>Inserts a linked or embedded object.</td></tr>
    <tr><td><kbd>J</kbd></td><td><strong>JOIN</strong></td><td>Joins similar objects to form a single, unbroken object.</td></tr>
    <tr><td><kbd>JOG</kbd></td><td><strong>DIMJOGGED</strong></td><td>Creates jogged dimensions for circles and arcs.</td></tr>
    <tr><td><kbd>L</kbd></td><td><strong>LINE</strong></td><td>Creates straight line segments.</td></tr>
    <tr><td><kbd>LA</kbd></td><td><strong>LAYER</strong></td><td>Manages layers and layer properties.</td></tr>
    <tr><td><kbd>LAS</kbd></td><td><strong>LAYERSTATE</strong></td><td>Saves, restores and manages named layer states.</td></tr>
    <tr><td><kbd>LE</kbd></td><td><strong>QLEADER</strong></td><td>Creates a leader and leader annotation.</td></tr>
    <tr><td><kbd>LEN</kbd></td><td><strong>LENGTHEN</strong></td><td>Changes the length of objects and the included angle of arcs.</td></tr>
    <tr><td><kbd>LESS</kbd></td><td><strong>MESHSMOOTHLESS</strong></td><td>Decreases the level of smoothness for mesh objects by one level.</td></tr>
    <tr><td><kbd>LI</kbd></td><td><strong>LIST</strong></td><td>Displays property data for selected objects.</td></tr>
    <tr><td><kbd>LO</kbd></td><td><strong>LAYOUT</strong></td><td>Creates and modifies drawing layout tabs.</td></tr>
    <tr><td><kbd>LT</kbd></td><td><strong>LINETYPE</strong></td><td>Loads, sets and modifies linetypes.</td></tr>
    <tr><td><kbd>LTS</kbd></td><td><strong>LTSCALE</strong></td><td>Changes the scale factor of linetypes for all objects in a drawing.</td></tr>
    <tr><td><kbd>LW</kbd></td><td><strong>LWEIGHT</strong></td><td>Sets the current lineweight, lineweight display options and lineweight units.</td></tr>
    <tr><td><kbd>M</kbd></td><td><strong>MOVE</strong></td><td>Moves objects a specified distance in a specified direction.</td></tr>
    <tr><td><kbd>MA</kbd></td><td><strong>MATCHPROP</strong></td><td>Applies the properties of a selected object to other objects.</td></tr>
    <tr><td><kbd>MAT</kbd></td><td><strong>MATERIALS</strong></td><td>Shows or hides the Materials window.</td></tr>
    <tr><td><kbd>ME</kbd></td><td><strong>MEASURE</strong></td><td>Creates point objects or blocks at measured intervals along the length or perimeter of an object.</td></tr>
    <tr><td><kbd>MEA</kbd></td><td><strong>MEASUREGEOM</strong></td><td>Measures the distance, radius, angle, area and volume of selected objects or a sequence of points.</td></tr>
    <tr><td><kbd>MI</kbd></td><td><strong>MIRROR</strong></td><td>Creates a mirrored copy of selected objects.</td></tr>
    <tr><td><kbd>ML</kbd></td><td><strong>MLINE</strong></td><td>Creates multiple parallel lines.</td></tr>
    <tr><td><kbd>MLA</kbd></td><td><strong>MLEADERALIGN</strong></td><td>Aligns and spaces selected multileader objects.</td></tr>
    <tr><td><kbd>MLC</kbd></td><td><strong>MLEADERCOLLECT</strong></td><td>Organizes multileaders that contain blocks into rows or columns, with a single leader.</td></tr>
    <tr><td><kbd>MLD</kbd></td><td><strong>MLEADER</strong></td><td>Creates a multileader object.</td></tr>
    <tr><td><kbd>MLE</kbd></td><td><strong>MLEADEREDIT</strong></td><td>Adds leader lines to, or removes leader lines from, a multileader object.</td></tr>
    <tr><td><kbd>MLS</kbd></td><td><strong>MLEADERSTYLE</strong></td><td>Creates and modifies multileader styles.</td></tr>
    <tr><td><kbd>MO</kbd></td><td><strong>PROPERTIES</strong></td><td>Controls properties of existing objects.</td></tr>
    <tr><td><kbd>MORE</kbd></td><td><strong>MESHSMOOTHMORE</strong></td><td>Increases the level of smoothness for mesh objects by one level.</td></tr>
    <tr><td><kbd>MS</kbd></td><td><strong>MSPACE</strong></td><td>Switches from paper space to a model space viewport.</td></tr>
    <tr><td><kbd>MSM</kbd></td><td><strong>MARKUP</strong></td><td>Opens the Markup Set Manager.</td></tr>
    <tr><td><kbd>MT</kbd></td><td><strong>MTEXT</strong></td><td>Creates a multiline text object.</td></tr>
    <tr><td><kbd>MV</kbd></td><td><strong>MVIEW</strong></td><td>Creates and controls layout viewports.</td></tr>
    <tr><td><kbd>NORTH</kbd></td><td><strong>GEOGRAPHICLOCATION</strong></td><td>Specifies the geographic location information for a drawing file.</td></tr>
    <tr><td><kbd>NSHOT</kbd></td><td><strong>NEWSHOT</strong></td><td>Creates a named view with motion that is played back with ShowMotion.</td></tr>
    <tr><td><kbd>NVIEW</kbd></td><td><strong>NEWVIEW</strong></td><td>Creates a named view with no motion.</td></tr>
    <tr><td><kbd>O</kbd></td><td><strong>OFFSET</strong></td><td>Creates concentric circles, parallel lines and parallel curves.</td></tr>
    <tr><td><kbd>OP</kbd></td><td><strong>OPTIONS</strong></td><td>Customizes the program settings.</td></tr>
    <tr><td><kbd>ORBIT</kbd></td><td><strong>3DORBIT</strong></td><td>Rotates the view in 3D space, constrained to horizontal and vertical orbit only.</td></tr>
    <tr><td><kbd>OS</kbd></td><td><strong>OSNAP</strong></td><td>Sets running object snap modes.</td></tr>
  </tbody>
</table></div>` },
        { title: 'P – S', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>P</kbd></td><td><strong>PAN</strong></td><td>Moves the view in the current viewport (the printed guide repeats the BPARAMETER description here by mistake).</td></tr>
    <tr><td><kbd>PA</kbd></td><td><strong>PASTESPEC</strong></td><td>Pastes objects from the clipboard and controls the format of the data.</td></tr>
    <tr><td><kbd>PAR</kbd></td><td><strong>PARAMETERS</strong></td><td>Controls the associative parameters used in the drawing.</td></tr>
    <tr><td><kbd>PARAM</kbd></td><td><strong>BPARAMETER</strong></td><td>Adds a parameter with grips to a dynamic block definition.</td></tr>
    <tr><td><kbd>PATCH</kbd></td><td><strong>SURFPATCH</strong></td><td>Creates a new surface by fitting a cap over a surface edge that forms a closed loop.</td></tr>
    <tr><td><kbd>PC</kbd></td><td><strong>POINTCLOUD</strong></td><td>Provides options to create and attach point cloud files.</td></tr>
    <tr><td><kbd>PCATTACH</kbd></td><td><strong>POINTCLOUDATTACH</strong></td><td>Inserts an indexed point cloud file into the current drawing.</td></tr>
    <tr><td><kbd>PCINDEX</kbd></td><td><strong>POINTCLOUDINDEX</strong></td><td>Creates an indexed point cloud (PCG or ISD) file from a scan file.</td></tr>
    <tr><td><kbd>PE</kbd></td><td><strong>PEDIT</strong></td><td>Edits polylines and 3D polygon meshes.</td></tr>
    <tr><td><kbd>PL</kbd></td><td><strong>PLINE</strong></td><td>Creates a 2D polyline.</td></tr>
    <tr><td><kbd>PO</kbd></td><td><strong>POINT</strong></td><td>Creates a point object.</td></tr>
    <tr><td><kbd>POFF</kbd></td><td><strong>HIDEPALETTES</strong></td><td>Hides currently displayed palettes (including the command line).</td></tr>
    <tr><td><kbd>POL</kbd></td><td><strong>POLYGON</strong></td><td>Creates an equilateral closed polyline.</td></tr>
    <tr><td><kbd>PON</kbd></td><td><strong>SHOWPALETTES</strong></td><td>Restores the display of hidden palettes.</td></tr>
    <tr><td><kbd>PR</kbd></td><td><strong>PROPERTIES</strong></td><td>Displays the Properties palette.</td></tr>
    <tr><td><kbd>PRE</kbd></td><td><strong>PREVIEW</strong></td><td>Displays the drawing as it will be plotted.</td></tr>
    <tr><td><kbd>PRINT</kbd></td><td><strong>PLOT</strong></td><td>Plots a drawing to a plotter, printer or file.</td></tr>
    <tr><td><kbd>PS</kbd></td><td><strong>PSPACE</strong></td><td>Switches from a model space viewport to paper space.</td></tr>
    <tr><td><kbd>PSOLID</kbd></td><td><strong>POLYSOLID</strong></td><td>Creates a 3D wall-like polysolid.</td></tr>
    <tr><td><kbd>PTW</kbd></td><td><strong>PUBLISHTOWEB</strong></td><td>Creates HTML pages that include images of selected drawings.</td></tr>
    <tr><td><kbd>PU</kbd></td><td><strong>PURGE</strong></td><td>Removes unused items, such as block definitions and layers, from the drawing.</td></tr>
    <tr><td><kbd>PYR</kbd></td><td><strong>PYRAMID</strong></td><td>Creates a 3D solid pyramid.</td></tr>
    <tr><td><kbd>QC</kbd></td><td><strong>QUICKCALC</strong></td><td>Opens the QuickCalc calculator.</td></tr>
    <tr><td><kbd>QCUI</kbd></td><td><strong>QUICKCUI</strong></td><td>Displays the Customize User Interface Editor in a collapsed state.</td></tr>
    <tr><td><kbd>QP</kbd></td><td><strong>QUICKPROPERTIES</strong></td><td>Displays quick properties of selected objects.</td></tr>
    <tr><td><kbd>QSAVE</kbd></td><td><strong>QSAVE</strong></td><td>Saves the current drawing.</td></tr>
    <tr><td><kbd>QVD</kbd></td><td><strong>QVDRAWING</strong></td><td>Displays open drawings and layouts in a drawing using preview images.</td></tr>
    <tr><td><kbd>QVDC</kbd></td><td><strong>QVDRAWINGCLOSE</strong></td><td>Closes preview images of open drawings and layouts in a drawing.</td></tr>
    <tr><td><kbd>QVL</kbd></td><td><strong>QVLAYOUT</strong></td><td>Displays preview images of model space and layouts in a drawing.</td></tr>
    <tr><td><kbd>QVLC</kbd></td><td><strong>QVLAYOUTCLOSE</strong></td><td>Closes preview images of model space and layouts in the current drawing.</td></tr>
    <tr><td><kbd>R</kbd></td><td><strong>REDRAW</strong></td><td>Refreshes the display in the current viewport.</td></tr>
    <tr><td><kbd>RA</kbd></td><td><strong>REDRAWALL</strong></td><td>Refreshes the display in all viewports.</td></tr>
    <tr><td><kbd>RC</kbd></td><td><strong>RENDERCROP</strong></td><td>Renders a specified rectangular area (crop window) within a viewport.</td></tr>
    <tr><td><kbd>RE</kbd></td><td><strong>REGEN</strong></td><td>Regenerates the entire drawing from the current viewport.</td></tr>
    <tr><td><kbd>REA</kbd></td><td><strong>REGENALL</strong></td><td>Regenerates the drawing and refreshes all viewports.</td></tr>
    <tr><td><kbd>REC</kbd></td><td><strong>RECTANG</strong></td><td>Creates a rectangular polyline.</td></tr>
    <tr><td><kbd>REG</kbd></td><td><strong>REGION</strong></td><td>Converts an object that encloses an area into a region object.</td></tr>
    <tr><td><kbd>REN</kbd></td><td><strong>RENAME</strong></td><td>Changes the names assigned to items such as layers and dimension styles.</td></tr>
    <tr><td><kbd>REV</kbd></td><td><strong>REVOLVE</strong></td><td>Creates a 3D solid or surface by sweeping a 2D object around an axis.</td></tr>
    <tr><td><kbd>RO</kbd></td><td><strong>ROTATE</strong></td><td>Rotates objects around a base point.</td></tr>
    <tr><td><kbd>RP</kbd></td><td><strong>RENDERPRESETS</strong></td><td>Specifies render presets — reusable rendering parameters.</td></tr>
    <tr><td><kbd>RPR</kbd></td><td><strong>RPREF</strong></td><td>Displays or hides the Advanced Render Settings palette.</td></tr>
    <tr><td><kbd>RR</kbd></td><td><strong>RENDER</strong></td><td>Creates a photorealistic or realistically shaded image of a 3D solid or surface model.</td></tr>
    <tr><td><kbd>RW</kbd></td><td><strong>RENDERWIN</strong></td><td>Displays the Render window without starting a rendering.</td></tr>
    <tr><td><kbd>S</kbd></td><td><strong>STRETCH</strong></td><td>Stretches objects crossed by a selection window or polygon.</td></tr>
    <tr><td><kbd>SC</kbd></td><td><strong>SCALE</strong></td><td>Enlarges or reduces selected objects, keeping their proportions.</td></tr>
    <tr><td><kbd>SCR</kbd></td><td><strong>SCRIPT</strong></td><td>Executes a sequence of commands from a script file.</td></tr>
    <tr><td><kbd>SEC</kbd></td><td><strong>SECTION</strong></td><td>Uses the intersection of a plane and solids, surfaces or mesh to create a region.</td></tr>
    <tr><td><kbd>SET</kbd></td><td><strong>SETVAR</strong></td><td>Lists or changes the values of system variables.</td></tr>
    <tr><td><kbd>SHA</kbd></td><td><strong>SHADEMODE</strong></td><td>Starts the VSCURRENT command.</td></tr>
    <tr><td><kbd>SL</kbd></td><td><strong>SLICE</strong></td><td>Creates new 3D solids and surfaces by slicing existing objects.</td></tr>
    <tr><td><kbd>SN</kbd></td><td><strong>SNAP</strong></td><td>Restricts cursor movement to specified intervals.</td></tr>
    <tr><td><kbd>SO</kbd></td><td><strong>SOLID</strong></td><td>Creates solid-filled triangles and quadrilaterals.</td></tr>
    <tr><td><kbd>SP</kbd></td><td><strong>SPELL</strong></td><td>Checks spelling in a drawing.</td></tr>
    <tr><td><kbd>SPE</kbd></td><td><strong>SPLINEDIT</strong></td><td>Edits a spline or spline-fit polyline.</td></tr>
    <tr><td><kbd>SPL</kbd></td><td><strong>SPLINE</strong></td><td>Creates a smooth curve that passes through or near specified points.</td></tr>
    <tr><td><kbd>SPLANE</kbd></td><td><strong>SECTIONPLANE</strong></td><td>Creates a section object that acts as a cutting plane through 3D objects.</td></tr>
    <tr><td><kbd>SPLAY</kbd></td><td><strong>SEQUENCEPLAY</strong></td><td>Plays named views in one category.</td></tr>
    <tr><td><kbd>SPLIT</kbd></td><td><strong>MESHSPLIT</strong></td><td>Splits a mesh face into two faces.</td></tr>
    <tr><td><kbd>SSM</kbd></td><td><strong>SHEETSET</strong></td><td>Opens the Sheet Set Manager.</td></tr>
    <tr><td><kbd>ST</kbd></td><td><strong>STYLE</strong></td><td>Creates, modifies or specifies text styles.</td></tr>
    <tr><td><kbd>STA</kbd></td><td><strong>STANDARDS</strong></td><td>Manages the association of standards files with drawings.</td></tr>
    <tr><td><kbd>SU</kbd></td><td><strong>SUBTRACT</strong></td><td>Combines selected 3D solids, surfaces or 2D regions by subtraction.</td></tr>
  </tbody>
</table></div>` },
        { title: 'T – Z', html: String.raw`
<div class="tbl-wrap"><table class="tbl hotkeys">
  <thead><tr><th>Alias</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>T</kbd></td><td><strong>MTEXT</strong></td><td>Creates a multiline text object.</td></tr>
    <tr><td><kbd>TA</kbd></td><td><strong>TABLET</strong></td><td>Calibrates, configures and turns on/off an attached digitizing tablet.</td></tr>
    <tr><td><kbd>TB</kbd></td><td><strong>TABLE</strong></td><td>Creates an empty table object.</td></tr>
    <tr><td><kbd>TEDIT</kbd></td><td><strong>TEXTEDIT</strong></td><td>Edits a dimensional constraint, dimension or text object.</td></tr>
    <tr><td><kbd>TH</kbd></td><td><strong>THICKNESS</strong></td><td>Sets the default 3D thickness property when creating 2D geometric objects.</td></tr>
    <tr><td><kbd>TI</kbd></td><td><strong>TILEMODE</strong></td><td>Controls whether paper space can be accessed.</td></tr>
    <tr><td><kbd>TO</kbd></td><td><strong>TOOLBAR</strong></td><td>Displays, hides and customizes toolbars.</td></tr>
    <tr><td><kbd>TOL</kbd></td><td><strong>TOLERANCE</strong></td><td>Creates geometric tolerances contained in a feature control frame.</td></tr>
    <tr><td><kbd>TOR</kbd></td><td><strong>TORUS</strong></td><td>Creates a donut-shaped 3D solid.</td></tr>
    <tr><td><kbd>TP</kbd></td><td><strong>TOOLPALETTES</strong></td><td>Opens the Tool Palettes window.</td></tr>
    <tr><td><kbd>TR</kbd></td><td><strong>TRIM</strong></td><td>Trims objects to meet the edges of other objects.</td></tr>
    <tr><td><kbd>TS</kbd></td><td><strong>TABLESTYLE</strong></td><td>Creates, modifies or specifies table styles.</td></tr>
    <tr><td><kbd>UC</kbd></td><td><strong>UCSMAN</strong></td><td>Manages defined user coordinate systems.</td></tr>
    <tr><td><kbd>UN</kbd></td><td><strong>UNITS</strong></td><td>Controls coordinate and angle display formats and precision.</td></tr>
    <tr><td><kbd>UNHIDE</kbd> / <kbd>UNISOLATE</kbd></td><td><strong>UNISOLATEOBJECTS</strong></td><td>Displays objects previously hidden with ISOLATEOBJECTS or HIDEOBJECTS.</td></tr>
    <tr><td><kbd>UNI</kbd></td><td><strong>UNION</strong></td><td>Unions two solid or two region objects.</td></tr>
    <tr><td><kbd>V</kbd></td><td><strong>VIEW</strong></td><td>Saves and restores named views, camera views, layout views and preset views.</td></tr>
    <tr><td><kbd>VGO</kbd></td><td><strong>VIEWGO</strong></td><td>Restores a named view.</td></tr>
    <tr><td><kbd>VP</kbd></td><td><strong>DDVPOINT</strong></td><td>Sets the 3D viewing direction.</td></tr>
    <tr><td><kbd>VPLAY</kbd></td><td><strong>VIEWPLAY</strong></td><td>Plays the animation associated with a named view.</td></tr>
    <tr><td><kbd>VS</kbd></td><td><strong>VSCURRENT</strong></td><td>Sets the visual style in the current viewport.</td></tr>
    <tr><td><kbd>VSM</kbd></td><td><strong>VISUALSTYLES</strong></td><td>Creates and modifies visual styles and applies a visual style to a viewport.</td></tr>
    <tr><td><kbd>W</kbd></td><td><strong>WBLOCK</strong></td><td>Writes objects or a block to a new drawing file.</td></tr>
    <tr><td><kbd>WE</kbd></td><td><strong>WEDGE</strong></td><td>Creates a 3D solid wedge.</td></tr>
    <tr><td><kbd>WHEEL</kbd></td><td><strong>NAVSWHEEL</strong></td><td>Displays a wheel that contains a collection of view navigation tools.</td></tr>
    <tr><td><kbd>X</kbd></td><td><strong>EXPLODE</strong></td><td>Breaks a compound object into its component objects.</td></tr>
    <tr><td><kbd>XA</kbd></td><td><strong>XATTACH</strong></td><td>Inserts a DWG file as an external reference (xref).</td></tr>
    <tr><td><kbd>XB</kbd></td><td><strong>XBIND</strong></td><td>Binds one or more definitions of named objects in an xref to the current drawing.</td></tr>
    <tr><td><kbd>XC</kbd></td><td><strong>XCLIP</strong></td><td>Crops the display of a selected external reference or block reference to a specified boundary.</td></tr>
    <tr><td><kbd>XL</kbd></td><td><strong>XLINE</strong></td><td>Creates a line of infinite length.</td></tr>
    <tr><td><kbd>XR</kbd></td><td><strong>XREF</strong></td><td>Starts the EXTERNALREFERENCES command.</td></tr>
    <tr><td><kbd>Z</kbd></td><td><strong>ZOOM</strong></td><td>Increases or decreases the magnification of the view in the current viewport.</td></tr>
    <tr><td><kbd>ZEBRA</kbd></td><td><strong>ANALYSISZEBRA</strong></td><td>Projects stripes onto a 3D model to analyze surface continuity.</td></tr>
    <tr><td><kbd>ZIP</kbd></td><td><strong>ETRANSMIT</strong></td><td>Creates a self-extracting or zipped transmittal package.</td></tr>
  </tbody>
</table></div>` }
      ]
    }
  ]
});
