//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BusInspector.Dal
{
    using System;
    using System.Collections.Generic;
    
    public partial class Observacion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Observacion()
        {
            this.Observacion1 = new HashSet<Observacion>();
        }
    
        public int id { get; set; }
        public string Descripcion { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
        public Nullable<int> inspector { get; set; }
        public Nullable<int> seccion { get; set; }
        public decimal interno { get; set; }
        public string patente { get; set; }
        public Nullable<int> CodInspector { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Observacion> Observacion1 { get; set; }
        public virtual Observacion Observacion2 { get; set; }
    }
}
