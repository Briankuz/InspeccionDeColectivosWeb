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
    
    public partial class vw_Inspeccion
    {
        public int id { get; set; }
        public Nullable<decimal> interno { get; set; }
        public Nullable<decimal> Conductor_id { get; set; }
        public string Conductor_Nombre { get; set; }
        public int Inspector_id { get; set; }
        public string Inspector_Nombre { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public int Seccion_Id { get; set; }
        public string Seccion_Nombre { get; set; }
    }
}
