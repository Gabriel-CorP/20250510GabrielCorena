using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Responses
{
    public class Response
    {
        public int Code { get; set; }
        public string Message { get; set; }
    }

    public class Response<T> : Response
    {
        public T Model { get; set; }
    }
}
