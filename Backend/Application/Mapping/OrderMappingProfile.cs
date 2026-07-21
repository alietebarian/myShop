using AutoMapper;
using Domain.Entities;

namespace Application.Mapping;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    { // GetOrderById
        CreateMap<Order, Features.Order.GetOrderById.OrderDetailsDto>();
        CreateMap<OrderItem, Features.Order.GetOrderById.OrderItemDetailsDto>();

        // GetMyOrders
        CreateMap<Order, Features.Order.GetMyOrders.OrderDto>();
        CreateMap<OrderItem, Features.Order.GetMyOrders.OrderItemDto>();
    }
}
