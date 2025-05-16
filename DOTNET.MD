# CommitGenWrapper .NET Integration

Este repositório oferece um wrapper em C# para o CLI `commit-gen`, permitindo que desenvolvedores ASP.NET/C# gerem mensagens de commit usando o mesmo motor AI do Node.js.

---

## 📋 Pré-requisitos

* .NET SDK 6.0+ (ou superior)
* Node.js 14+
* Acesso ao NuGet (nuget.org ou feed privado)
* **commit-gen** e **ai.js** (local ou publicada no npm)

---

## 🛠️ Instalação e Publicação

### 1. Crie a Class Library C\#

```bash
# No diretório da sua solution
dotnet new classlib -n CommitGenWrapper
cd CommitGenWrapper
```

### 2. Instale o Jering.Javascript.NodeJS

```bash
dotnet add package Jering.Javascript.NodeJS
```

### 3. Adicione os arquivos JS

No mesmo diretório, crie:

```
CommitGenWrapper/
├─ package.json
├─ index.js      # seu CLI original (opcional)
├─ ai.js         # módulo de geração de commits
└─ wrapper.js    # função exportada para .NET
```

#### package.json

```json
{
  "name": "commit-gen-wrapper",
  "version": "1.0.0",
  "main": "wrapper.js",
  "dependencies": {
    "prompt-sync": "^4.2.0",
    "commit-gen": "^1.0.0",
    "ai.js": "^1.0.0"
  }
}
```

#### wrapper.js

```js
import { generateCommit } from './ai.js';

export default async function (args) {
  const { diff, lang, model } = args;
  return await generateCommit(diff, lang, model);
}
```

### 4. Ajuste o `.csproj` para incluir arquivos JS

Abra `CommitGenWrapper.csproj` e adicione:

```xml
<ItemGroup>
  <Content Include="**\*.js">
    <CopyToOutputDirectory>Always</CopyToOutputDirectory>
  </Content>
  <Content Include="package.json">
    <CopyToOutputDirectory>Always</CopyToOutputDirectory>
  </Content>
</ItemGroup>
```

### 5. Restaurar dependências e gerar pacote NuGet

```bash
# Instala as deps JS
npm install

# Empacota a lib .NET
dotnet pack -c Release
```

O `.nupkg` ficará em `bin/Release`.

### 6. Publicar no NuGet

```bash
dotnet nuget push bin/Release/CommitGenWrapper.1.0.0.nupkg \
--api-key SUA_CHAVE_NUGET \
--source https://api.nuget.org/v3/index.json
```

---

## 🚀 Uso em ASP .NET

1. **Adicione o pacote**

   ```bash
   dotnet add package CommitGenWrapper
   ```
2. **Registre o serviço NodeJS**  
   Em `Program.cs` (ou `Startup.cs`):
   ```csharp
   builder.Services.AddNodeJS();
   ```

3. **Chame o wrapper**
   ```csharp
   using Jering.Javascript.NodeJS;

   public class CommitService {
   private readonly INodeJSService \_nodeJS;

   public CommitService(INodeJSService nodeJS) => \_nodeJS = nodeJS;
   
   public async Task<string> GenerateAsync(string diff, string lang, string model)
   {
      return await _nodeJS.InvokeFromFileAsync<string>(
          "./wrapper.js",
          args: new { diff, lang, model }
      );
   }
   }
   ```

4. **Exponha numa API**  
   ```csharp
    [ApiController]
    [Route("api/commit")]
    public class CommitController : ControllerBase
    {
        private readonly CommitService _svc;
        public CommitController(CommitService svc) => _svc = svc;

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DiffDto dto)
        {
            var msg = await _svc.GenerateAsync(dto.Diff, dto.Lang, dto.Model);
            return Ok(new { commit = msg });
        }
    }

    public record DiffDto(string Diff, string Lang, string Model);
   ```

---

## 🎯 Conclusão
* Qualquer dúvida ou sugestão de melhorias, só abrir issue ou PR!
