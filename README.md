## Plugin Definitions

### Manifest

```json
{
  "title": "Showcase",
  "src": "https://e6fa-2a02-4e0-2d7d-c8d-5883-39e8-b0d6-c31d.ngrok-free.app/",
  "uiDefinition": {
    "height": 900
  },
  "singleton": false,
  "lazy": true
}
```

### Settings

```json
{
  "bg-color": "orange",
  "text-color": "white"
}
```

## GrispiClient Instance Initialization

The `GrispiClient.instance()` initialization code is as follows:

```tsx
useEffect(() => {
  GrispiClient.instance()
    ._init()
    .then((data: GrispiBundle) => {
      setTicket(data.context.ticket);
      setSettings(data.settings);
      setLoading(false);

      GrispiClient.instance().activeTicketChanged = function (ticket: Ticket) {
        setTicket(ticket);
      };
    })
    .catch((err) => {
      console.error({ err });
    });
}, []);
```

# Sources

- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://shadcn.dev/)
- [Craco](https://github.com/gsoft-inc/craco)
- [Create React App](https://github.com/facebook/create-react-app)
- [React documentation](https://reactjs.org/)
