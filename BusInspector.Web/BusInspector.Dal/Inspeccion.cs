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
    
    public partial class Inspeccion
    {
        public int id { get; set; }
        public Nullable<int> CodInspector { get; set; }
        public Nullable<decimal> Interno { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> Seccion { get; set; }
    
        public virtual Inspector Inspector { get; set; }
    }
}
