/**
 * Template Drive Mailto Functionality for Use in a Generic HTML Form
 *
 * Example Usage:
 *
 * var _form = new mailto();
 *
 * _form.to = "grow@viableindustries.com";
 * _form.template = "Hello Viable, \n\rMy name is %s and I work with %s a %s as their %s. My team and I are looking to create %s that helps us %s.\n\rWe would like to keep the project costs between $%s and $%s. We would like to complete this project by %s.\n\rSincerely,\n%s\n%s";
 * _form.fields = [
 *   human_name,
 *   human_organization_name,
 *   human_organization_type,
 *   human_organization_title,
 *   project_name,
 *   project_goal,
 *   project_cost_min,
 *   project_cost_max,
 *   project_timeframe,
 *   human_signature,
 *   human_email
 * ];
 */
 var mailto = function() {

   this.to = "";
   this.subject = "";
   this.template = "";
   this.fields = [];

   this.parse = function(template) {

     if (arguments.length !== 2 && arguments[1].constructor !== Array) {
       console.error('[MailTo] Argument list is invalid. Should consist of a string (template) and an array (field keys)');
       return;
     }

     var args = [].slice.call(arguments[1], 0),
         i = 0;

     return template.replace(/%s/g, function() {
         return args[i++];
     });
   };

   this.parseFields = function() {

     var _fields = [];

     this.fields.forEach(function(_field) {
       _fields.push(_field.value)
     });

     return _fields;
   };

   this.body = function(_data) {
     var self = this,
         fields = self.parseFields(),
         message = self.parse(self.template, fields);

     return encodeURI(message);
   };

   this.send = function(message) {
     /** @todo The window.open method only works for links and will not
               open system applications like Mail.app or Outlook. We need
               to detect the type of mail that is activated.
     **/
     return window.open(message, "_blank");
   };

   this.submit = function(message) {
     var self = this,
         _body = self.body(message);

     self.send("mailto:" + self.to + "?subject=" + self.subject + "&body=" + _body);
   };

};
