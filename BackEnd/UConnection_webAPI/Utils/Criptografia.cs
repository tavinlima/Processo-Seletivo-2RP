namespace UConnection_webAPI.Utils
{
    public class Criptografia
    {
        public static string GerarHash(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }
        public static bool Comparar(string senhaForm, string senhaCadastrada)
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaCadastrada);
        }
    }
}
